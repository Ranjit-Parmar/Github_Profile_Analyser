import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import axios from "axios";
import { GitHubCommit, Repository } from "@/types/userTypes";
import { useEffect, useState } from "react";

type ChartData = {
  date: string;
  commits: number;
};

type Props = {
  repo: Repository;
};

const CommitChart = ({ repo }: Props) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const getUserCommit = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/commits?per_page=100`
      );
      const commits: GitHubCommit[] = response.data;

      // Group commits by date
      const groupedCommits: { [key: string]: number } = {};

      commits.forEach((c) => {
        const date = new Date(c.commit.author.date).toISOString().split("T")[0]; // Format: YYYY-MM-DD
        groupedCommits[date] = (groupedCommits[date] || 0) + 1;
      });

      // Convert grouped data to array for chart
      const formattedData: ChartData[] = Object.entries(groupedCommits).map(
        ([date, commits]) => ({
          date,
          commits,
        })
      );

      // Optional: Sort by date
      formattedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
  };

  useEffect(() => {
    if (repo.full_name) {
      getUserCommit();
    }
  }, [repo]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Commits per Day</CardTitle>
          <CardDescription>
            Showing the number of commits for each day
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                });
              }}
            />
            <YAxis />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const date = payload[0].payload.date;
                  return (
                    <div className="custom-tooltip p-2 bg-white border rounded shadow">
                      <p>
                        {new Date(date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>Commits: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar dataKey="commits" fill="#8884d8" barSize={30}/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CommitChart;
