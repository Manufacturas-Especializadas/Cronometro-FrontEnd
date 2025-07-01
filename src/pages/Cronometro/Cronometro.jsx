import { useEffect, useState } from "react";
import Logo from "../../assets/logomesa.png";

const Cronometro = () => {
    const[startTime, setStarTime] = useState(null);
    const[elapsed, setElapsed] = useState(0);
    const[isRunning, setIsRunnig] = useState(false);
    const[selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        let interval = null;
    
        if (isRunning) {
            interval = setInterval(() => {
                const now = new Date();
                const diffSinceStart = Math.floor((now - startTime) / 10);
                setElapsed(diffSinceStart);
            }, 10);
        }
    
        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const getTimeData = () => {
        const totalSeconds = Math.floor(elapsed / 100);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds / (60 * 60) % 24));
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

    const handleStart = () => {
        let startDate;

        if(selectedDate){
            startDate = new Date(selectedDate);
        } else{
            startDate = new Date();
        }

        setStarTime(startDate);
        setIsRunnig(true);
    };

    const handlePause = () => {
        setIsRunnig(false);
    };

    const handleReset = () => {
        setElapsed(0);
        setIsRunnig(false);
        setStarTime(null);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
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
            <div className="relative z-10 flex flex-col items-center text-black uppercase w-full max-w-3xl">
                <h1 className="text-green-600 text-3xl sm:text-5xl md:text-7xl font-bold mb-6 text-center">
                    Días sin accidentes
                </h1>            

                <div className="rounded-lg p-4 sm:p-6 mb-4 text-center w-full">
                    <span className="text-6xl sm:text-7xl md:text-[130px] font-extrabold tracking-wider text-black">
                        { days }
                    </span>
                    <p className="text-xl sm:text-2xl md:text-3xl mt-2 text-green-600">días</p>
                </div>

                <div className="rounded-lg p-4 sm:p-6 mb-6 text-center w-full">
                    <div className="text-6xl sm:text-7xl md:text-[140px] font-mono text-black tracking-wider">
                        { formattedTime }
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6">
                    {!isRunning ? (
                        <button
                            onClick={ handleStart }
                            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white 
                                text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105
                                hover:cursor-pointer"
                        >
                            Iniciar
                        </button>
                    ) : (
                        <button
                            onClick={ handlePause }
                            className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white 
                                text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105
                                hover:cursor-pointer"
                        >
                            Pausar
                        </button>
                    )}
                    <button
                        onClick={ handleReset }
                        className="px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white 
                            text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105
                            hover:cursor-pointer"
                    >
                        Reiniciar
                    </button>                   
                </div>
                <div className="w-full max-w-md">
                        <label htmlFor="startDate" className="block text-base sm:text-lg mb-2 text-gray-700 text-center">
                            Selecciona una fecha de inicio:
                        </label>
                        <input
                            id="startDate"
                            type="date"
                            value={ selectedDate }
                            onChange={ handleDateChange }
                            className="border border-gray-300 rounded-md p-2 w-full text-black text-center"
                        />
                    </div>
            </div>
        </div>
    )
}

export default Cronometro
