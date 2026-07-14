import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface WeightChartProps {
  data: Array<{ label: string; weight: number }>
}

function WeightChart({ data }: WeightChartProps) {
  return (
    <div className="weight-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 18, right: 8, bottom: 0, left: -25 }}>
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#75807a', fontSize: 12 }} />
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} tickLine={false} axisLine={false} tick={{ fill: '#75807a', fontSize: 12 }} unit=" kg" />
          <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid #dfe6dc', boxShadow: '0 12px 28px rgba(15, 31, 27, .08)' }} formatter={(value) => [`${Number(value).toFixed(1)} kg`, 'Peso']} />
          <Line type="monotone" dataKey="weight" stroke="#143d36" strokeWidth={3} dot={{ r: 5, fill: '#d9ed5e', stroke: '#143d36', strokeWidth: 2 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeightChart
