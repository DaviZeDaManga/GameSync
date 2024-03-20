import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import LoadingBar from "react-top-loading-bar";

export default function Navegacao(page, nome, id, complemento) {

    const navigate = useNavigate()
    const ref = useRef()

    function Navegar() {
        ref.current.continuousStart()

        if (page == 1) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/${nome}`)
            }, 1500); 
        } 

        if (page == 2) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/planos${nome}${id}`)
            }, 1500); 
        } 

        if (page == 3) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/produtos${nome}${id}${complemento}`)
            }, 1500); 
        } 

        if (page == 4) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/games${nome}${id}`)
            }, 1500); 
        } 

        if (page == 6) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/perfil${nome}`)
            }, 1500); 
        }

        //ARRUMA ESSE
        if (page == 7) {
            setTimeout(() => {
                ref.current.complete()
                navigate(`/perfil${nome}`)
            }, 1500); 
        }
    }

    return (
        <>
        <LoadingBar color="#f11946" ref={ref} />
        <button className='navigation' onClick={() => Navegar()}></button>
        </>
    )
}