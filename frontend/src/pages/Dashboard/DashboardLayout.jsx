import { NavLink } from "react-router-dom"

const DashboardLayout = ({menuItems = [], children}) => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 col-md-3">
                    <div>
                        <ul className="list-group">
                            {
                                menuItems.map((item, i) => {
                                    return (
                                        <li className="list-group-item" key={i}>
                                            <NavLink style={({ isActive }) =>
                                                isActive ? {color: '#000'} : undefined
                                            } to={item.to}>{item.text}</NavLink>
                                        </li>

                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout