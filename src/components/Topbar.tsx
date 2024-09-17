export const Topbar = () => {
    return(
        <div className="px-20 text-lg flex flex-row justify-between">
            <div className="flex space-x-4">
                <a href="/">
                    <p className="cursor-pointer hover:text-blue-600 hover:underline">Home</p>
                </a>
                <a href="https://www.growmeorganic.com/" target="_blank">
                    <p className="cursor-pointer hover:text-blue-600 hover:underline">GrowMeOrganic</p>
                </a>
            </div>
            <div className="flex space-x-4">
                <a href="https://github.com/sarthakmishraa" target="_blank">
                    <p className="cursor-pointer hover:text-blue-600 hover:underline">My GitHub</p>
                </a>
                <a href="https://www.linkedin.com/in/sarthakmishraa/" target="_blank">
                    <p className="cursor-pointer hover:text-blue-600 hover:underline">My LinkedIn</p>
                </a>
            </div>
        </div>
    )
};