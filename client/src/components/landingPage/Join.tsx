import  React from "react";
import Button from "../Button";

interface JoinProps {
}

const Join: React.FC<JoinProps> = ({
}) => {
  return(
    <div className="bg-slate-200 flex w-full py-20">
        <div className="grid grid-cols-12 place-items-center w-full">
                <div className="col-span-2">
                </div>
                <div className="col-span-8">
                    <h1>Werde Teil unserer Community</h1>
                    <div className="bg-white flex w-full p-4">
                    <div className="grid grid-cols-8 place-items-center w-full">
                        <div className="col-span-6">
                            <h5>In Connect & Explore treffen sich Leute, um neue Freunde kennenzulernen, etwas Neues zu lernen, ihre Komfortzone zu verlassen oder einfach gemeinsam Hobbys auszuüben. Die Mitgliedschaft ist kostenlos.</h5>
                            <Button label={"Registrieren"} onClick={()=>{}} />
                        </div>
                        <div className="col-span-2">
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHkAeQMBEQACEQEDEQH/xAAcAAEAAwEAAwEAAAAAAAAAAAAABQYHBAECCAP/xABBEAABAwMCAgcFBAQPAAAAAAABAAIDBAUREiEGMQcTIkFRYXEUMpGhwTZCsbJydIHRFSMkMzRDUlRic5Kz4fDx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQECBv/EAC4RAAICAQMBBwMDBQAAAAAAAAABAgMRBBIxIQUTIjJBUWFxgfAjkbEUM1LB0f/aAAwDAQACEQMRAD8A3FAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEBHXO/Wi0lrbpc6Skc7drZ5mtJ9ATlcbSPUYSlwjlZxhwzI8MZxBay53Ie1x7/ADXNyPTqsXKJiORkjQ6Nwc07hzTkFeiM90AQBAEAQBAEAQBAEAQBAU/pH4rdw5a2spD/AC+p7EO2dPi7Hl+OPFRWz2R6E1FXeS68GD3B75p31FS4yTybySyv1PcfEkrPlJy5NSKSWEI7fU+ze1yU0opQRmUsOn/xeVye8PBc+jji+a0XmnttTKXW+pcIsF2RC8+6W+ROBhWqLcPaynqKVKO5cm6q6ZwQBAEAQBAEAQBAEAQBAYH0uVzp+OJoe0WUUUcbW92pzQ4keupvwVHUy8WDT0scV59ya4V4VoaaNlRXiOouDhqe1xDhEfDHiFVefsW04roi1TMhMDmTNYIiMEOxpwuYyM46mM8TW8Wq8SxUx/i8iSBwOds7YPkV6i2upxpP6M+k7RVNrrVR1bHBzZ4GSBw78gFayeUYclhtHWunAgCAIAgCAIAgCAIAgMV4httLdukarcx7ppm1LXTD+rYxkTA1pOPeLh8AVm6iXjZs6WOak/zkm6GkrY7m4vjooqZsTSzqYt9R95urnt44335Lku7cOknkR73f1ilE7bqyeegnbSNidM1pdG2ZuppcAcA+p2z5qOvbu8T6Elm5R8Ky/krN74WfdKKKWV9NBVxMDnSRRlocSMua5vl3EE58F2yUU+jyhVGbWJJJ/BoXR49rOFqSj6zVLRaqeVuclhadh8CMeWFo0y3QTMrVRcbXksylK4QBAEAQBAEAQHrI9scbnuOGtGSVxtJZZ1Jt4Rxm5RjV2T2ZGsPoeR9FF3y6kvcS6fT+DtUxCYZebubP0mXJjZBHQSVbOujAGnPVtGrywd9lm6hZmzZ00v0o/nqXdzuoHWkOe0ke5jYHv9FDFZLPm6I95WOpgMxud1rtI0vY78Dy816dMo9WeVPfx6fD/wBorXG16fZKSKOmew1U7tg5uoBo5nHrgLxjPJ1zxwW7gK1UFVw3brnNA2StqItU8vIyu1H3gNnY5bhalUVsRjaicu8ayXAAAYAwFKVzygCAIAgCAIAgOO5ueykc9m4BGsY5t71Fc2oZRLSk5pMr0kulrmA57Ibkd5adj8FQcsdPzk04wz1/OqJ+mqzUVckbcdWxjTnxJ3V6Fm6bRmzq2QTfLyfPXHmp/GF2kcOzJVP0HxDSWfi0hVL/ADs0dO/00S/AXEFxdV/wVM01NKyMuDj70TR3eY9VXn4Y7kWK/FLBcqmq6mjndaaVjqkRuLG6MAuxsDjzwolcpNJFiUJ4zNmOVlxqrrXOq66UyyuGMkYAHgB3BWWsLBSTyzcOhitNTwiadziTSVMkYz4HDx+Yq/Q8wRnatYsyX1TFYIAgCAIAgCAID1kaHxuY7k4YK41lYOp4eSoTxOhldG/mw4PmsiUXF4ZtwmpR3I7aKsp7Vb6mvrH6Isho8XEdw8eau6SPRsze0LYxxn0MU4wnNTUNl6sNaZ6iVrvvESyukw70yQu6qOMM89natXSlHGOP+Et0ZVMIqK6jmmp4HPa2RjpnBuvGxGT6jb1VPupWdImjPUQoW6fBoToI4xqmrqGNg+86pai0luSOXaemSzuM949gsTohJaqeP2hjtU9VGzQJS5wBGO/v3KtSo2U9eTPq7Qd+rUYeV5/gsvQhIymguNNLK0PncyeNnIkacO+inpg4wWTl+phZa4LlGqKUjCAIAgCAIAgCAICB4iY1s8L8YLmkE+mP3qjq0spmjoX4ZIofGFbLJLTUJ7MMDC8D+05xOT9PirOk/tmJ2w3/AFG34KjdoRNQybbtGoKS+O6toraC11aiL9+n7kZam4qKJ2N3MkB9MqtSvL9zU18swuXzH98E/geCvHz5GXcmeSGjZyJ1yEdzRt/30Va/M2q0avZ7jTCeol6dF9STt0stE+Gop3mOaM6mOH3SrGDNc3u3Z6mycM3yG+W9szAGzs7M0efdd+49y8tYNam5WxyTC4TBAEAQBAEAQBAQvEY/o5/S+ipav0L2h5kUPi+DLKeoA5EsP4j6r1o5cxKPbdXSFi+hVpmmSF7GkZc0gE8ldksppGHVJRmpP0PxpqVkTIdI3Y3Tk+C5GCjjBJdfOxvc+Xn7nSvZAero2uOS3JPzXMLOTu54wGuLpTHpdrOC0BpJIKNpLLPShKTxFZfwXbgaB1rrTVVWprZWaCM4Ddwckd/L9ipPWRc8Lj3N7S9lTrrdk/N7fHz8mjggjIVo8nlAEAQBAEAQBARHELcwRPxyfj4j/hVNWvCmXNE/G0Va70ft1C+DXoJw4OxnBBVSu11y3It6nTrU1utvBS7na6i01LIJZA/XG2UHGNitaue+Cljk+S1VKotdec4OUa/JSFfoO15Ic6HhzZHbNIyeSHehtzLRSttMFAWAshja1rsbggYyoLa1ZHEj6CicqWnArs9NJTzvhk20947/ADWTKtwltZuQsjOKkidsFQ+SF8L8kRY0uPgc7fJX9LNuO1+hmaytRluXqSytFQIAgCAIAgCA562nFTTPi5EjY+BXiyG+LiSVT2TUivR2yqklET4iwZw555ALPWnm3ho0pamtR3JlX6SGtZfYWs2ApWDHh2nLVisI+V1rzbl+xVF6KgQHhxw0kcwEOG8wuD4WPHJzQVGb64KtXSdbVzSZ2Ljj0CyrJbptm3THbWkT9op/Z6Nuodt/ad9Pkr9ENkDM1Fm+x+yO5TEAQBAEAQBAEAQBAY/xpUmq4mrXZy2Nwib5aQAfnle1wY+plutZBrpAEB7RsdI8MjaXPccAAZJXG0llnYxc3tistmr2e6PisEMNU0srIogzB31EbA5Cpz1MMPB9JRpLdsd6+p+dqpPaqoahmOPtO+gVaivfLr6Ghqbe7hhcss4WkZIQBAEAQBAEAQBAEBgnHVxnj4yuwgMfVCYANLORDGg8vPJ/apoxWCrZp65yyyFF3nHOCMnycV3aQvSR9zybxN/dmf602nP6OP8AkTvClymq6xlJFD1U8jy6WoG+iFoyQ3P3ids+aqaqOI7nwvT5NLQUxhLEfM/X2RpNFSTVhIhaMN5knYLOrqlZwbFt0avMWWgpW0lOIwcnm4+JWjVWoRwZVtjsluZ0qQjCAIAgCAIAgCAIAgPmq/z+1X651GciSsmc0/4dZx8sKzHgjfJwAOdIyONpc97g1rQMkk8ggQc18cj45WFj2OLXNdzaQcEFdTDOihrqq3z9fRTGKXGNQAO3oV4srjYtsj1CyVb3RNw6MDPJwfSTVMjpJJHyHU/mWhxA+QUDjGLxFHtylLrJlsQ4EAQBAEAQBAEAQBAeDyKA+Xpf52T9M/irSIjrsX2jtH6/B+cLy+DqHEH2mvH6/P8A7jl2PAZxrpw3/o4+xVq/y3fncq8/MSLgsi8nQgCAIAgP/9k=" alt="" />
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                </div>
                
            </div>
    </div>
  )
  }
  
export default Join;
