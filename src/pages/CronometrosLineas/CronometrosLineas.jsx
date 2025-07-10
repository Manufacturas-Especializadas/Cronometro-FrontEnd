import { useState, useEffect } from "react";
import Logo from "../../assets/logomesa.png";

const CronometrosLineas = () => {
        const initialLineas = [
            { id: 1, nombre: "Línea 1" },
            { id: 2, nombre: "Línea 2" },
            { id: 3, nombre: "Línea 3" },
            { id: 4, nombre: "Línea 4" },
            { id: 5, nombre: "Línea 5" },
            { id: 6, nombre: "Línea 6" },
            { id: 7, nombre: "Línea 7" },
            { id: 8, nombre: "Línea 8" },
            { id: 9, nombre: "Línea 9" },
            { id: 10, nombre: "Línea 10" },
            { id: 11, nombre: "Línea 11" },
            { id: 12, nombre: "Línea 12" },
            { id: 14, nombre: "Línea 14" },
            { id: 15, nombre: "Línea 15" },
            { id: 17, nombre: "Línea 17" },
            { id: 18, nombre: "Línea 18" },
            { id: 19, nombre: "Mantenimiento" },
            { id: 20, nombre: "Embarques" },
            { id: 21, nombre: "Almacén" },
            { id: 22, nombre: "SG" },
            { id: 23, nombre: "Calidad" },
        ].map(linea => {
            const savedData = localStorage.getItem(`cronometro-${linea.id}`);
            return savedData 
                ? { ...linea, ...JSON.parse(savedData) } 
                : { ...linea, startTime: null, elapsed: 0, isRunning: false, selectedDate: "" };
        });
    
        const [lineas, setLineas] = useState(initialLineas);
    
        const saveToLocalStorage = (id, data) => {
            localStorage.setItem(`cronometro-${id}`, JSON.stringify(data));
        };
    
        const updateLinea = (id, updatedProps) => {
            setLineas(prevLineas => {
                const updatedLineas = prevLineas.map(linea => 
                    linea.id === id ? { ...linea, ...updatedProps } : linea
                );
                
                const lineaToSave = updatedLineas.find(l => l.id === id);
                if (lineaToSave) {
                    const { startTime, elapsed, isRunning, selectedDate } = lineaToSave;
                    saveToLocalStorage(id, { startTime, elapsed, isRunning, selectedDate });
                }
                
                return updatedLineas;
            });
        };
    
        useEffect(() => {
            const intervals = lineas
                .filter(linea => linea.isRunning)
                .map(linea => {
                    return setInterval(() => {
                        const now = new Date();
                        const diffSinceStart = Math.floor((now - new Date(linea.startTime)) / 10);
                        updateLinea(linea.id, { elapsed: diffSinceStart });
                    }, 10);
                });
    
            return () => intervals.forEach(interval => clearInterval(interval));
        }, [lineas]);
    
        useEffect(() => {
            const loadedLineas = lineas.map(linea => {
                const savedData = localStorage.getItem(`cronometro-${linea.id}`);
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    
                    // Si estaba corriendo, ajustamos el tiempo transcurrido
                    if (parsedData.isRunning && parsedData.startTime) {
                        const now = new Date();
                        const startTime = new Date(parsedData.startTime);
                        parsedData.elapsed = Math.floor((now - startTime) / 10);
                    }
                    
                    return { ...linea, ...parsedData };
                }
                return linea;
            });
            
            setLineas(loadedLineas);
        }, []);
    
        const getTimeData = (elapsed) => {
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
    
        // Manejadores de eventos
        const handleStart = (id) => {
            const linea = lineas.find(l => l.id === id);
            let startDate;
    
            if (linea.selectedDate) {
                startDate = new Date(linea.selectedDate);
            } else {
                startDate = new Date();
            }
    
            updateLinea(id, {
                startTime: startDate.toISOString(),
                isRunning: true,
                elapsed: 0
            });
        };
    
        const handlePause = (id) => {
            updateLinea(id, { isRunning: false });
        };
    
        const handleReset = (id) => {
            updateLinea(id, {
                elapsed: 0,
                isRunning: false,
                startTime: null,
                selectedDate: ""
            });
        };
    
        const handleDateChange = (id, date) => {
            updateLinea(id, { selectedDate: date });
        };

    return (
        <div className="min-h-screen w-full bg-white px-4 py-8">
            <div className="relative w-full max-w-6xl mx-auto mb-8">
                <div className="absolute top-0 left-0 z-0">
                    <img 
                        src={ Logo } 
                        alt="Logo"
                        className="max-w-[100px] sm:max-w-[150px] md:max-w-[200px] h-auto"
                    />
                </div>

                <div className="relative z-10 text-center">
                    <h1 className="text-green-600 text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
                        Días sin accidentes
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
                        Control por línea de producción
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
                {lineas.map((linea) => {
                    const { days, hours, minutes, seconds } = getTimeData(linea.elapsed);
                    const formattedTime = `${hours}:${minutes}:${seconds}`;

                    return (
                        <div
                            key={ linea.id }
                            className="bg-gray-50 rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="text-center mb-2">
                                <h3 className="text-5xl font-bold text-gray-800">
                                    { linea.nombre }
                                </h3>
                            </div>

                            {/* Display de días */}
                            <div className="text-center mb-2">
                                <span className="text-5xl md:text-6xl font-extrabold text-black">
                                    { days }
                                </span>
                            </div>

                            <div className="text-xl md:text-2xl font-mono text-black mb-3 text-center">
                                { formattedTime }
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <input
                                    type="date"
                                    value={linea.selectedDate}
                                    onChange={(e) => handleDateChange(linea.id, e.target.value)}
                                    className="border border-gray-300 rounded-md p-1 text-black text-center text-sm w-full"
                                />

                                <div className="flex gap-2 justify-center">
                                    {!linea.isRunning ? (
                                        <button
                                            onClick={() => handleStart(linea.id)}
                                            className="px-3 py-1 bg-green-500 hover:bg-green-600 
                                            text-white text-sm font-bold rounded-lg transition-all
                                            hover:cursor-pointer"
                                        >
                                            Iniciar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handlePause(linea.id)}
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 
                                            text-white text-sm font-bold rounded-lg transition-all
                                            hover:cursor-pointer"
                                        >
                                            Pausar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleReset(linea.id)}
                                        className="px-3 py-1 bg-gray-500 hover:bg-gray-600 
                                        text-white text-sm font-bold rounded-lg transition-all
                                        hover:cursor-pointer"
                                    >
                                        Reiniciar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default CronometrosLineas