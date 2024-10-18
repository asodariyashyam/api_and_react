import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 m-auto">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Your Company</h2>
              <p className="text-sm text-gray-400">© 2024 Your Company. All rights reserved.</p>
            </div>
    
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-gray-300">About Us</a>
              <a href="#" className="hover:text-gray-300">Services</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            </div>
    
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-12c-3.314 0-6 2.686-6 6v12c0 3.314 2.686 6 6 6h12c3.314 0 6-2.686 6-6v-12c0-3.314-2.686-6-6-6zm-6.133 18v-7.997h-2.348v-2.72h2.348v-1.994c0-2.354 1.302-3.571 3.406-3.571.867 0 1.679.065 1.903.097v2.2h-1.298c-1.021 0-1.233.486-1.233 1.201v1.567h2.479l-.324 2.72h-2.155v7.997h-2.728z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3h-15.229c-1.324 0-2.386 1.062-2.386 2.386v15.229c0 1.324 1.062 2.386 2.386 2.386h15.229c1.324 0 2.386-1.062 2.386-2.386v-15.229c0-1.324-1.062-2.386-2.386-2.386zm-10.615 18v-8h3v8h-3zm1.5-9.5c-.967 0-1.75-.784-1.75-1.75s.783-1.75 1.75-1.75 1.75.784 1.75 1.75-.783 1.75-1.75 1.75zm9 9.5h-3v-4c0-.553-.447-1-1-1s-1 .447-1 1v4h-3v-8h3v1c.739-.546 1.646-.875 2.629-.875 1.935 0 3.371 1.482 3.371 3.375v4.5z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c-5.469 0-9.837 4.448-9.837 9.927 0 4.422 3.438 8.092 7.917 9.195.578.106.793-.256.793-.573 0-.285-.011-1.045-.016-2.054-3.219.711-3.899-1.573-3.899-1.573-.528-1.34-1.288-1.698-1.288-1.698-1.053-.724.079-.71.079-.71 1.164.085 1.775 1.207 1.775 1.207 1.033 1.771 2.714 1.259 3.379.962.106-.76.406-1.258.739-1.548-2.568-.291-5.268-1.287-5.268-5.74 0-1.269.453-2.307 1.195-3.118-.12-.293-.518-1.469.114-3.065 0 0 .972-.314 3.182 1.201.924-.263 1.917-.395 2.902-.4.983.005 1.977.137 2.902.4 2.206-1.515 3.177-1.201 3.177-1.201.635 1.596.239 2.772.119 3.065.746.811 1.191 1.849 1.191 3.118 0 4.46-2.705 5.446-5.279 5.732.418.365.793 1.088.793 2.199 0 1.589-.014 2.873-.014 3.263 0 .323.207.684.803.569 4.469-1.109 7.901-4.776 7.901-9.195 0-5.48-4.369-9.927-9.838-9.927z"/>
                </svg>
              </a>
            </div>
            
          </div>
        </footer>
      );
}
