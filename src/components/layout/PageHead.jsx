import React from 'react'

// type Props = {
//     pageTitle : String;
//     pageDescription : String;
//     pageHeadBackground : String;
// }

const PageHead = (props) => {

    return(
        <div className={`bg-gradient-to-r ${props.pageHeadBackground} flex pt-28 pb-6`}>
            <div className="max-w-7xl mx-auto p-2 text-center text-white">
                <h2 className="text-5xl md:text-6xl font-semibold mb-2">
                    {props.pageTitle}
                </h2>
                <p className="text-md md:text-xl">
                    {props.pageDescription}
                </p>
            </div>
        </div>
    )
}

export default PageHead