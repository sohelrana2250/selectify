

export const Animation=<style jsx>{`
    @keyframes scale-x {
      0% { transform: scaleX(0) translateX(-50%); }
      100% { transform: scaleX(1) translateX(-50%); }
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes fade-in {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .animate-scale-x {
      animation: scale-x 1.5s ease-out forwards;
    }
    
    .animate-gradient {
      background-size: 200% auto;
      animation: gradient 4s linear infinite;
    }
    
    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }
    
    .delay-100 {
      animation-delay: 100ms;
    }
    
    .delay-200 {
      animation-delay: 200ms;
    }
    
    .delay-300 {
      animation-delay: 300ms;
    }
    
    .delay-500 {
      animation-delay: 500ms;
    }
  `}</style>