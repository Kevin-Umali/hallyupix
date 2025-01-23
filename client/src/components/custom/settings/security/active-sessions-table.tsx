import { Loader2, LogOut } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Session } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomLoader from "@/components/custom/custom-loader";

interface ActiveSessionsTableProps {
  currentSession: Session["session"] | null;
  sessionList: Array<Session["session"]>;
  onRevokeSession: (token: string) => Promise<void>;
  onRevokeAllSessions: () => Promise<void>;
  isRevokingSession: boolean;
  isRevokingOtherSessions: boolean;
  isLoadingSessions: boolean;
}

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const diffInSeconds = (date.getTime() - now.getTime()) / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (Math.abs(diffInSeconds) < 60) {
    return "just now";
  } else if (Math.abs(diffInMinutes) < 60) {
    return formatter.format(Math.round(diffInMinutes), "minute");
  } else if (Math.abs(diffInHours) < 24) {
    return formatter.format(Math.round(diffInHours), "hour");
  } else {
    return formatter.format(Math.round(diffInDays), "day");
  }
};

const ActiveSessionsTable = ({
  sessionList,
  currentSession,
  onRevokeSession,
  onRevokeAllSessions,
  isRevokingSession = true,
  isRevokingOtherSessions = true,
  isLoadingSessions = true,
}: ActiveSessionsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Manage your active sessions</CardDescription>
          </div>
          <Button variant="outline" onClick={onRevokeAllSessions} disabled={isRevokingOtherSessions || isRevokingSession || isLoadingSessions}>
            {isRevokingOtherSessions || isRevokingSession ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Revoke All
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[240px]">Device</TableHead>
              <TableHead className="w-[120px]">IP Address</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[100px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingSessions ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex items-center justify-center h-[200px]">
                    <CustomLoader text="Loading sessions..." />
                  </div>
                </td>
              </tr>
            ) : (
              sessionList.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="truncate max-w-[180px]" title={session.userAgent || "N/A"}>
                        {session.userAgent}
                      </div>
                      {session.id === currentSession?.id && (
                        <Badge variant="outline" className="shrink-0">
                          Current
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{session.ipAddress || "N/A"}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{formatRelativeTime(session.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRevokeSession(session.token)}
                      disabled={session.id === currentSession?.id || isRevokingSession || isRevokingOtherSessions || isLoadingSessions}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Revoke session</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActiveSessionsTable;
