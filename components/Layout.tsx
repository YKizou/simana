import React, { FC, useContext, MouseEvent } from "react";
import Head from 'next/head';
import { ChevronLeftIcon, ChevronRightIcon  } from '@heroicons/react/outline'
import {  HomeIcon } from '@heroicons/react/solid'
import { Context } from "../store/context";

type Props = {
    pageTitle?: string
}

const Layout: FC<Props> = (props) => {
    const { state, dispatch } = useContext(Context);
    const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch({type: 'NEXT_WEEK'});
    };
    const handlePrevious = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch({type: 'PREVIOUS_WEEK'});
    }
    const handleHome = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch({type: 'TODAY'})
    }
    return (
        <>
            <Head>
                <title>{props.pageTitle}</title>
            </Head>
            <div className="mx-auto">
                <nav className="bg-indigo-600 py-3 px-6 flex justify-between items-center">
                    <h1 className="text-white">
                        Weekly planner
                    </h1>
                    <div>
                        <button className="p-2 mx-2" onClick={handleHome}>
                            <HomeIcon className="h-5 w-5 text-white" />
                        </button>
                        <button className="p-2 bg-white rounded-3xl mx-2" onClick={handlePrevious}>
                            <ChevronLeftIcon className="h-5 w-5 text-indigo-600" />
                        </button>
                        <button className="p-2 bg-white rounded-3xl mx-2" onClick={handleNext}>
                            <ChevronRightIcon className="h-5 w-5 text-indigo-600" />
                        </button>
                    </div>
                </nav>
                <main className="py-3 px-6">
                    {props.children}
                </main>
            </div>
        </>
    )
}

export default Layout;