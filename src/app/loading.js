'use client'
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="loader"></div>
                <div className="text-center text-lg font-bold mt-4">
                    <p>Loading...</p>
                </div>
                <style jsx>{`
        .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
                }
                `}</style>
            </div>
           
        </div>
    );

}