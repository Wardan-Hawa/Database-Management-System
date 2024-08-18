import './SelectingDoctor.css'
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { AlertContex } from "../../../../context/AlertContex"

const SelectingDoctor = ({reportId, setSelectingDoctor, setSelectingReportId, }) => {
    const { token } = useContext(AuthContext);
    const { toggleOn } = useContext(AlertContex)

    const [specialities, setSpecialities] = useState([])
    const [doctors, setDoctors] = useState([])
    const specialityRef = useRef()
    const getAllSpeciality = async () => {
        const res = await fetch("http://localhost:3000/api/v1/users/specialities/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
              
            },
        });
        const json = await res.json();
        setSpecialities(json.data)
    }
    const getDoctors = async () => {
        const id = specialityRef.current.options[specialityRef.current.selectedIndex].value
        const res = await fetch(`http://localhost:3000/api/v1/users/specialities/${id}	`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await res.json();
        setDoctors(json.data.Speciality.Users)
    }
    useEffect(() => {
        getAllSpeciality();
    }, [])

    const createConsulting = async (doctorId) => {
        const res = await fetch(`http://localhost:3000/api/v1/consulting/`, {
            method: "POST",
            body: JSON.stringify({
                reportId: reportId,
                userId: doctorId
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                'content-Type' : 'application/json'
            },
        });
        const json = await res.json()
        console.log(json);
        if (json.success) {
            toggleOn(json.messages, json.success  )
            setSelectingDoctor(false)
            setSelectingReportId(null)

        }
    }

    return (
        <>
            <div className="drugs-overlay">

            </div>
            <div className="drugs-modal">
                <h4 className='p-3 m-0'>
                    Create Consulting
                </h4>
                <div className='px-3 mb-3'>
                    <select className='form-control' required onChange={getDoctors} ref={specialityRef}>
                        <option value=''>Select Speciality</option>
                        {
                            specialities.map((speciality, i) => {
                                return (
                                    <option value={speciality.id} key={i}>{speciality.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='mb-3 px-3'>
                        {doctors?.map((doctor, i) => {
                            return (
                                <div className='d-flex doctor-line align-items-center'>
                                    <img
                                        // src={doctor.UserMeta[0].metaValue}
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div>{doctor.name}</div>
                                    <div>
                                        <button className='btn btn-primary' onClick={() => { createConsulting(doctor.id) }}>Select</button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div></>
    )
}

export default SelectingDoctor