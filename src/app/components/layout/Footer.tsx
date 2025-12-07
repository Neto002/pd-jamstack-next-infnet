const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} AutoStore. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
