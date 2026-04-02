import { BarChart3, CheckCircle2, Tag, XCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { SummaryData, SummaryRow } from '@/types/event'

interface SummaryViewProps {
  data: SummaryData | null
}

export function SummaryView({ data }: SummaryViewProps) {
  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Cargando resumen...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <BarChart3 className="h-4 w-4" />
            <span>Total Denuncias</span>
          </div>
          <p className="text-3xl font-bold">{data.totals.total}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Arreglados
            </Badge>
          </div>
          <p className="text-3xl font-bold text-green-600">{data.totals.arreglados}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="pending" className="gap-1">
              <XCircle className="h-3 w-3" />
              Pendientes
            </Badge>
          </div>
          <p className="text-3xl font-bold text-red-600">{data.totals.pendientes}</p>
        </div>
      </div>

      {/* Por Tipo */}
      {/* {data.porTipo.length > 0 && (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Por Tipo</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Tipo</TableHead>
                <TableHead className="text-center font-semibold">Total</TableHead>
                <TableHead className="text-center font-semibold">Arreglados</TableHead>
                <TableHead className="text-center font-semibold">Pendientes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.porTipo.map(row => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-center font-semibold">{row.total}</TableCell>
                  <TableCell className="text-center text-green-600">{row.arreglados}</TableCell>
                  <TableCell className="text-center text-red-600">{row.pendientes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )} */}

      {/* Por Etiqueta */}
      {data.porEtiqueta.length > 0 && (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Por Etiqueta</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Etiqueta</TableHead>
                <TableHead className="text-center font-semibold">Total</TableHead>
                <TableHead className="text-center font-semibold">Arreglados</TableHead>
                <TableHead className="text-center font-semibold">Pendientes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.porEtiqueta.map((row: SummaryRow) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-center font-semibold">{row.total}</TableCell>
                  <TableCell className="text-center text-green-600">{row.arreglados}</TableCell>
                  <TableCell className="text-center text-red-600">{row.pendientes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
