import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">MediSync</span>
          </Link>
        </div>
        <div className="text-sm text-muted-foreground italic">
          Your Health, In Perfect Harmony
        </div>
      </div>
    </header>
  );
};

export default Header; 