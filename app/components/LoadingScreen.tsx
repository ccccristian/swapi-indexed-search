'use client'
import { CSSProperties } from "react"
import Svg from "./ui/Svg"

export default function LoadingScreen()
{
    return(
        <main style={MainContainer}>
            <div 
            className="loading-animation"
            >
            <Svg
            name={`${Math.floor(Math.random() * 3) + 1}`}
            width={50}
            height={50}
            />
            </div>

            <h1 suppressHydrationWarning  style={Message}>{messages[Math.floor(Math.random() * 16) + 1]}</h1>
        </main>
    )
}


const MainContainer : CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
}

const Message : CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '2rem',
}

const messages =[
    "A long time ago in a galaxy far, far away...",
    "Searching for droids on Tatooine...",
    "Engaging hyperdrive to Coruscant...",
    "Retrieving plans from the Death Star...",
    "Negotiating with the Hutts...",
    "Powering up lightsabers...",
    "Connecting to the Force...",
    "Scanning for Rebel bases...",
    "Preparing the Millennium Falcon for takeoff...",
    "Decrypting Imperial transmissions...",
    "Training with Jedi Master Yoda...",
    "Plotting a course to Endor...",
    "Warming up the X-Wings...",
    "Spooling up the hyperdrive...",
    "Refueling at the Mos Eisley Cantina...",
    "Calibrating droid sensors...",
    "Synchronizing with the Holocron...",
    "Analyzing Sith artifacts...",
    "Deploying probe droids...",
    "Securing the perimeter on Hoth...",
    "Assembling a squad of stormtroopers...",
    "Initiating Kessel Run...",
    "Charging blaster packs...",
    "Accessing Jedi Archives...",
    "Communicating with the Resistance...",
    "Preparing for a jump to lightspeed...",
    "Scanning the galaxy for new adventures..."
]