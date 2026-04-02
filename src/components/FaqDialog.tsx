import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'que-es',
    question: 'Que es esta plataforma?',
    answer:
      'Es un panel de visualizacion que muestra reportes de acumulacion de basura en la via publica de la Ciudad de Buenos Aires. Los datos provienen de la app Bacheame y se presentan de forma simple para que cualquier vecino pueda ver donde se acumula basura.',
  },
  {
    id: 'como-reportar',
    question: 'Como puedo reportar basura?',
    answer:
      'Los reportes se hacen a traves de la app Bacheame, disponible en App Store y Google Play. Desde ahi podes sacar una foto de la basura acumulada, marcar la ubicacion y enviarlo. El reporte aparece automaticamente en este panel.',
  },
  {
    id: 'que-pasa-despues',
    question: 'Que pasa despues de que se reporta basura?',
    answer:
      'Cada reporte queda registrado con su ubicacion y foto. Desde este panel podes ver todos los puntos donde se acumula basura en la ciudad para darle visibilidad al problema.',
  },
  {
    id: 'quien-esta-detras',
    question: 'Quien esta detras de esta iniciativa?',
    answer:
      'Esta iniciativa es impulsada por el Diputado Juan I. Fernandez (CABA). El objetivo es usar la tecnologia para hacer visible la acumulacion de basura en la via publica y exigir soluciones.',
  },
  {
    id: 'datos',
    question: 'Que se hace con los datos que se recopilan?',
    answer:
      'Los datos se usan exclusivamente para documentar puntos de acumulacion de basura y hacer seguimiento. No se comparte informacion personal. Todo lo que ves en el panel es informacion publica sobre la via publica.',
  },
  {
    id: 'zonas',
    question: 'Cubre todas las zonas de la ciudad?',
    answer:
      'Si, se pueden ver reportes de basura en cualquier zona de la Ciudad Autonoma de Buenos Aires. Cuantos mas reportes haya de una zona, mas visible se hace el problema de la basura en ese lugar.',
  },
  {
    id: 'costo',
    question: 'Tiene algun costo usar la plataforma?',
    answer:
      'No, tanto la app Bacheame para reportar como este panel de consulta son completamente gratuitos. Es una herramienta ciudadana abierta a todos.',
  },
]

interface FaqDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function FaqDialog({ open, onOpenChange }: FaqDialogProps): React.JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Preguntas Frecuentes</DialogTitle>
          <DialogDescription>
            Encontra respuestas a las consultas mas comunes sobre la plataforma
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 pr-2">
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { FaqDialog }
