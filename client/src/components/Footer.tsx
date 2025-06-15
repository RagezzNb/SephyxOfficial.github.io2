export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-orbitron text-2xl font-bold text-neon-green mb-4">SEPHYX</h3>
            <p className="text-gray-400 max-w-md mb-6">
              Next-generation streetwear for the digital era. Where fashion meets technology and urban culture collides with cyber aesthetics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4">SHOP</h4>
            <ul className="space-y-2">
              <li><a href="#featured" className="text-gray-400 hover:text-neon-green transition-colors duration-300">New Arrivals</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-neon-green transition-colors duration-300">Collections</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">Sale</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">Gift Cards</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-orbitron font-bold text-white mb-4">SUPPORT</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SEPHYX. All rights reserved. Designed for the future.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300 text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300 text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300 text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
