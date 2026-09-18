import PixelScene from './PixelScene';

// Fondo de paisaje: usa los mismos escenarios dibujados de la Historia
export default function PixelBackground({ name = 'ruta', className = '' }) {
  return <PixelScene name={name} className={`absolute inset-0 w-full h-full ${className}`} />;
}
