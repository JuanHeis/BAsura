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
      'Es un sistema de denuncia ciudadana que permite reportar baches y problemas en la via publica de la Ciudad de Buenos Aires. La idea es que entre todos podamos hacer visible el estado de las calles y exigir que se reparen.',
  },
  {
    id: 'como-reportar',
    question: 'Como puedo reportar un bache?',
    answer:
      'Por ahora los reportes se reciben a traves de la aplicacion Bacheame. Desde ahi podes sacar una foto del bache, marcar la ubicacion y enviarlo. El reporte aparece automaticamente en este panel para que todos puedan verlo.',
  },
  {
    id: 'que-pasa-despues',
    question: 'Que pasa despues de que se reporta un bache?',
    answer:
      'Cada reporte queda registrado con su ubicacion y foto. Desde este panel podes ver el estado de cada hallazgo: si esta pendiente, si ya fue arreglado o si tiene alguna novedad. La idea es darle seguimiento hasta que se solucione.',
  },
  {
    id: 'quien-esta-detras',
    question: 'Quien esta detras de esta iniciativa?',
    answer:
      'Esta iniciativa es impulsada por el Diputado Juan I. Fernandez (CABA) junto con el equipo de Bacheame. El objetivo es usar la tecnologia para mejorar la transparencia y la respuesta del gobierno ante los problemas de infraestructura urbana.',
  },
  {
    id: 'datos',
    question: 'Que se hace con los datos que se recopilan?',
    answer:
      'Los datos se usan exclusivamente para documentar el estado de las calles y hacer seguimiento de los reportes. No se comparte informacion personal de los usuarios. Todo lo que ves en el panel es informacion publica sobre la via publica.',
  },
  {
    id: 'zonas',
    question: 'Cubre todas las zonas de la ciudad?',
    answer:
      'Si, podes reportar baches en cualquier calle o avenida de la Ciudad Autonoma de Buenos Aires. El mapa muestra todos los reportes sin importar el barrio. Cuantos mas reportes haya de una zona, mas visible se hace el problema.',
  },
  {
    id: 'costo',
    question: 'Tiene algun costo usar la plataforma?',
    answer:
      'No, tanto la aplicacion Bacheame como este panel de consulta son completamente gratuitos. Es una herramienta ciudadana pensada para que cualquier persona pueda participar y consultar la informacion sin ningun tipo de barrera.',
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
