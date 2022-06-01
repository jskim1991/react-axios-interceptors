import { useNavigate } from 'react-router-dom'

const StartingPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <button
                onClick={() => {
                    navigate('/detail')
                }}
            >
                Start
            </button>
        </div>
    )
}

export default StartingPage
