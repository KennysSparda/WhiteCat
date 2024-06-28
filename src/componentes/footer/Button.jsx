export default function Button(props) {
    async function playAudio(audioSrc) {
      const audio = new Audio();
      if (audio.canPlayType("audio/mpeg")) {
        audio.src = audioSrc;
        audio.volume = 0.03;
      }
      await audio.play();
    }
  
    const buttonClass = "Button text-white font-bold py-2 px-4 rounded";
    let buttonStyle = {};
  
    const handleMouseEnter = () => {
      playAudio("/audio/mixkit-modern-technology-select-3124.wav");
      
      // Adiciona efeito de brilho ao passar o mouse para botões styled
      if (props.type === 'styled') {
        buttonStyle = { filter: 'brightness(1.5) blur(1px)' };
      }
    };
  
    const handleMouseDown = () => {
      playAudio("/audio/mixkit-interface-device-click-2577.wav");
    };
  
    const commonProps = {
      id: props.id,
      onClick: props.function,
      style: buttonStyle,
    };
  
    const isHomeButtonClass = props.isHomeButton ? 'w-full' : '';
  
    if (props.type === 'linkEx') {
      return (
        <a
          {...commonProps}
          className={`${buttonClass} ${isHomeButtonClass} bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none focus:shadow-outline-blue sm:inline-block md:inline-block lg:inline-block xl:inline-block`}
          href={props.path}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
        </a>
      );
    } else if (props.type === 'linkIn') {
      return (
        <a
          {...commonProps}
          className={`${buttonClass} ${isHomeButtonClass} bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none focus:shadow-outline-blue sm:inline-block md:inline-block lg:inline-block xl:inline-block`}
          href={props.path}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
        >
          {props.children}
        </a>
      );
    } else if (props.type === 'styled') {
      return (
        <button
          {...commonProps}
          className={`${buttonClass} ${isHomeButtonClass} bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none focus:shadow-outline-blue active:bg-indigo-800 sm:inline-block md:inline-block lg:inline-block xl:inline-block`}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
        >
          {props.children}
        </button>
      );
    } else {
      return (
        <button
          {...commonProps}
          className={`${buttonClass} ${isHomeButtonClass} bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none focus:shadow-outline-blue active:bg-indigo-800 sm:inline-block md:inline-block lg:inline-block xl:inline-block`}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
        >
          {props.children}
        </button>
      );
    }
  }