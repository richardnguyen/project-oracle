import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
} from "@mui/material";

// API base URL (your Render backend)
const API_BASE = "https://project-oracle-tvha.onrender.com/api";

// You will expose NEXT_PUBLIC_API_KEY in frontend to allow client-side requests
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Dashboard() {
  const [signals, setSignals] = useState([]);
  const [scannerState, setScannerState] = useState(null);
  const [systemState, setSystemState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const headers = { "x-api-key": API_KEY };

      const [sigRes, scanRes, sysRes] = await Promise.all([
        fetch(`${API_BASE}/signals`, { headers }),
        fetch(`${API_BASE}/scanner/state`, { headers }),
        fetch(`${API_BASE}/system/state`, { headers }),
      ]);

      if (!sigRes.ok || !scanRes.ok || !sysRes.ok) {
        throw new Error("Invalid API response (check API_KEY)");
      }

      const sigData = await sigRes.json();
      const scanData = await scanRes.json();
      const sysData = await sysRes.json();

      setSignals(sigData.signals || []);
      setScannerState(scanData.state || {});
      setSystemState(sysData.system || {});
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000); // auto refresh every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Project Oracle Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3}>
          {/* System Status */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">System Status</Typography>
                <Typography variant="body2" color="textSecondary">
                  Scanner: {systemState?.scanner ? "Active" : "No data"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last Update: {systemState?.lastUpdate || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Scanner State */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Scanner State</Typography>
                <pre>{JSON.stringify(scannerState, null, 2)}</pre>
              </CardContent>
            </Card>
          </Grid>

          {/* Signals */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">Signals</Typography>

                {signals.length === 0 ? (
                  <Typography>No signals found</Typography>
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Direction</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {signals.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell>{s.symbol}</TableCell>
                          <TableCell>{s.direction}</TableCell>
                          <TableCell>{s.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
// clean placeholder frontend
