import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">

            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl">Página no encontrada</p>
            <p className="text-muted-foreground">Lo siento, la página que estás buscando no existe.</p>
            <Button asChild variant="link">
                <Link to="/">Volver al inicio</Link>
            </Button>

        </div>
    )
}