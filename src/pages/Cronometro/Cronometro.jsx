import { useEffect, useState } from "react";
import Logo from "../../assets/logomesa.png";
import { useNavigate } from "react-router-dom";

const Cronometro = () => {
    const navigate = useNavigate();
    
    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem('cronometroPrincipal');
        return savedState 
            ? JSON.parse(savedState)
            : { startTime: null, elapsed: 0, isRunning: false, selectedDate: "" };
    });

    const { startTime, elapsed, isRunning, selectedDate } = state;

    useEffect(() => {
        localStorage.setItem('cronometroPrincipal', JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        let interval = null;
    
        if (isRunning) {
            interval = setInterval(() => {
                const now = new Date();
                const diffSinceStart = Math.floor((now - new Date(startTime)) / 10);
                setState(prev => ({ ...prev, elapsed: diffSinceStart }));
            }, 10);
        }
    
        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const getTimeData = () => {
        const totalSeconds = Math.floor(elapsed / 100);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        return {
            days,
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0')
        };
    };

    const { days, hours, minutes, seconds } = getTimeData();
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Manejadores de eventos
    const handleStart = () => {
        let startDate;

        if(selectedDate){
            startDate = new Date(selectedDate);
        } else {
            startDate = new Date();
        }

        setState({
            ...state,
            startTime: startDate.toISOString(),
            isRunning: true,
            elapsed: 0
        });
    };

    const handlePause = () => {
        setState(prev => ({ ...prev, isRunning: false }));
    };

    const handleReset = () => {
        setState({
            startTime: null,
            elapsed: 0,
            isRunning: false,
            selectedDate: ""
        });
    };

    const handleDateChange = (e) => {
        setState(prev => ({ ...prev, selectedDate: e.target.value }));
    };

    const handleNavigate = (path) => {
        navigate(path);
    };


    return (
        <div className="min-h-screen w-full relative flex items-center justify-center bg-white px-4 py-8">
            <div className="absolute top-4 left-4 z-0">
                <img 
                    src={ Logo } 
                    alt="Logo" 
                    className="max-w-[100px] sm:max-w-[150px] md:max-w-[200px] h-auto"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-black uppercase w-full max-w-6xl">
                <h1 className="text-green-600 text-4xl sm:text-6xl md:text-7xl font-bold mb-8 text-center">
                    Días sin accidentes
                </h1>
                <div className="rounded-lg p-4 sm:p-6 mb-10 text-center w-full mx-auto">
                    <span 
                        className="text-[300px] sm:text-[400px] md:text-[500px] lg:text-[600px] font-extrabold tracking-tight text-black whitespace-nowrap leading-none"
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                        { days }
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6 px-4 sm:px-0">
                    <div className="flex flex-col items-start gap-4 w-full sm:w-auto">
                        <label htmlFor="startDate" className="block text-base sm:text-lg mb-2 text-gray-700">
                            Selecciona una fecha de inicio:
                        </label>
                        <input
                            id="startDate"
                            type="date"
                            value={ selectedDate }
                            onChange={ handleDateChange }
                            className="border border-gray-300 rounded-md p-2 w-full sm:w-auto text-black text-center"
                        />

                        <div className="flex flex-wrap gap-4 mt-2">
                        {!isRunning ? (
                            <button
                                onClick={ handleStart }
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 
                                text-white text-lg font-bold rounded-xl transition-all 
                                duration-300 hover:scale-105 hover:cursor-pointer"
                            >
                            Iniciar
                            </button>
                        ) : (
                            <button
                                onClick={ handlePause }
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 
                                text-white text-lg font-bold rounded-xl transition-all 
                                duration-300 hover:scale-105 hover:cursor-pointer"
                            >
                            Pausar
                            </button>
                        )}
                        <button
                            onClick={ handleReset }
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 
                            text-white text-lg font-bold rounded-xl transition-all 
                            duration-300 hover:scale-105 hover:cursor-pointer"
                        >
                            Reiniciar
                        </button>
                        <button
                            onClick={() => handleNavigate("/cronometro-por-lineas")}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600
                            text-white text-lg font-bold rounded-xl transition-all
                            duration-300 hover:scale-105 hover:cursor-pointer"
                        >
                            Cronometro por lineas
                        </button>
                    </div>
                </div>
                    {/* Temporizador (lado derecho) */}
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono text-black tracking-tight self-end sm:self-auto">
                        {formattedTime}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cronometro
