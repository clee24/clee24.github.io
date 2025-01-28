const ProjectCard = ({ title, date, tech, link, isActive }) => (
    <div 
        className={`project-card ${isActive ? 'active' : ''}`} 
        onClick={() => {
            if (!isActive) return;
            if (link.startsWith('http')) {
                window.open(link, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = link;
            }
        }}
    >
        <h3>{title}</h3>
        <p className="date">{date}</p>
        <p className="tech">{tech}</p>
    </div>
);

const App = () => {
    const [initialVideoEnded, setInitialVideoEnded] = React.useState(false);
    const [showContent, setShowContent] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(true);
    const initialVideoRef = React.useRef(null);
    const loopVideoRef = React.useRef(null);
    const audioRef = React.useRef(null);

    React.useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('./src/A Foggy Day.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.muted = true;

        // Start showing content 3 seconds into the initial video
        if (initialVideoRef.current) {
            initialVideoRef.current.ontimeupdate = () => {
                if (initialVideoRef.current.currentTime >= 2 && !showContent) {
                    setShowContent(true);
                }
            };
            
            initialVideoRef.current.onended = () => {
                setInitialVideoEnded(true);
                if (loopVideoRef.current) {
                    loopVideoRef.current.play();
                }
            };
        }

        if (loopVideoRef.current) {
            loopVideoRef.current.load();
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (initialVideoRef.current) initialVideoRef.current.muted = !isMuted;
        if (loopVideoRef.current) loopVideoRef.current.muted = !isMuted;
        
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.play();
                audioRef.current.muted = false;
            } else {
                audioRef.current.muted = true;
            }
        }
    };

    const projects = [
        {
            title: "Ahoj!",
            date: "2024. 04",
            tech: "Flutter",
            link: "https://github.com/clee24/Ahoj"
        },
        {
            title: "Volleyball Computer Vision",
            date: "2024. 04",
            tech: "Python, AlphaPose",
            link: "https://wp.nyu.edu/volleyball_serve_classification/"
        },
        {
            title: "Junior IS",
            date: "2023. 05",
            tech: "Economics Research",
            link: "https://docs.google.com/document/d/1PodDbJsuYigydCP3AsLvAJZBHCrhNCLZeSjksJ4sYCU/edit?usp=sharing"
        },
        {
            title: "Portfolio",
            date: "2024. 01",
            tech: "React, HTML/CSS",
            link: "https://github.com/clee24/clee24.github.io"
        },
        {
            title: "Burger Time",
            date: "2021. 12",
            tech: "Pygame Zero",
            link: "https://replit.com/@clee24/CurlyMountainousFiles?embed=true"
        }
    ];

    return (
        <div className="app">
            <div className="header">
                <div className="header-buttons">
                    <a href="../index.html" className="home-button">Home</a>
                </div>
                <h1>Projects</h1>
                <div className="header-buttons">
                    <button onClick={toggleMute} className="sound-button">
                        <span className={isMuted ? "strikethrough" : ""}>Sound</span>
                    </button>
                </div>
            </div>
            <div className="video-container">
                <video
                    ref={initialVideoRef}
                    className="background-video"
                    style={{ display: initialVideoEnded ? 'none' : 'block' }}
                    autoPlay
                    muted={isMuted}
                    playsInline
                    preload="auto"
                >
                    <source src="videos/reactdesignvideo.mp4" type="video/mp4" />
                </video>
                <video
                    ref={loopVideoRef}
                    className="background-video"
                    style={{ display: initialVideoEnded ? 'block' : 'none' }}
                    autoPlay
                    muted={isMuted}
                    playsInline
                    loop
                    preload="auto"
                >
                    <source src="videos/reactdesignloop.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="content" style={{ opacity: showContent ? 1 : 0 }}>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} isActive={showContent} />
                    ))}
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
