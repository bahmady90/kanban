import SideBarBody from './SideBarBody';
import SidebarBottom from './SidebarBottom';
import SidebarHeader from './SidebarHeader';

export default function Sidebar ()  {
  
    return (
        <div className="hidden h-screen lg:w-[18.75rem] sm:w-[16.31rem] sm:grid grid-rows-2 dark:border-r-2 dark:border-r-dark-grey-border">
            <div className="flex flex-col gap-y-[3.375rem]">
                <SidebarHeader/>
                <SideBarBody/>
            </div>
            <div className="self-end mb-8 sm:gap-y-8 grid">
                <SidebarBottom/>
            </div>      
        </div>
    )
    }
    
