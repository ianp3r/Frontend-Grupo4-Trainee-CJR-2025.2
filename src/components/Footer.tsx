export default function Footer() {
  return (
    <footer className="bg-purple-800 text-purple-300 p-8 mt-12">
      <div className="container mx-auto max-w-7xl text-center">
        <p>&copy; {new Date().getFullYear()} Grupo 4 Ciclopes</p>
      </div>
    </footer>
  );
}
