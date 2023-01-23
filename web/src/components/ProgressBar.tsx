interface ProgressBarProps {
    progress: number
}

export function ProgressBar(props: ProgressBarProps) {
    const progressStyle = {
        width: `${props.progress}%`
    }

    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-2">
            <div
                role="progressbar" 
                aria-label="Barra de Progresso"
                aria-valuenow={props.progress}
                className="h-3 rounded-xl bg-violet-600 w-3/4"
                style={progressStyle}
                >
                

            </div>
        </div>
    )
}