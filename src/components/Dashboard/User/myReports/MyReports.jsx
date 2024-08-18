import { useContext, useParams, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import SelectingDoctor from "../SelectingDoctor/SelectingDoctor";
import { NavLink, useNavigate } from "react-router-dom";



const MyReports = () => {
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	

	const [reports, setReports] = useState([]);
	const [selectingDoctor, setSelectingDoctor] = useState(false)
	const [selectingReportId, setSelectingReportId] = useState(null)

	const report = async () => {
		const res = await fetch("http://localhost:3000/api/v1/report/", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const json = await res.json();
		console.log(json.data.reports);

		setReports(json.data.reports);
		

		console.log(reports);
	};

	useEffect(() => {
		report();
	}, []);

	const deleteconsulting = async (id) => {
		console.log(id);
		const res = await fetch(`http://localhost:3000/api/v1/report/${id}	`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const json = await res.json();
		console.log(json);
		if (json.success) {
			if (window.confirm("Are You Sure?")) {
			  const newReports = [...reports];
			  const index = newReports.findIndex((report) => report.id === id);
			  newReports.splice(index, 1);
			  setReports(newReports);
			}
		  }
	}
	
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						<div className="d-flex align-items-center justify-content-between">
							<h1 className="mt-0 mb-2">My Reports</h1>
							<Link className="btn btn-bright cyan  bg-color text-white" to='/create-report'>Create Report</Link>
						</div>
						<p>Here you will find a list of the reports you have created, you can create a consulting with many doctors from different specialities.</p>
					</div>
				</div>
			</div>

			<table className="table table-striped">
				<thead className="table-dark">
					<tr>
						<th style={{maxWidth: "150px"}}>Drugs Interactions</th>
						<th>Notes</th>
						<th>Date</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{
						reports.map((report, i) => {
							return (
								 <tr key={i}>
									<td style={{maxWidth: "200px"}} >
										{
											report.Interactions.map((interaction, j) => {
												return (
													<p className="m-0 py-1" key={j}>
														{interaction.name}
													</p>
												)
											})
										}
									</td>
									<td>{report.notes}</td>
									<td>{dayjs(report.createdAt).format('YYYY-MM-DD')}</td>
									<td>
									<button className=" ms-3 btn btn btn-warning"
											onClick={() => navigate(`my-reports/${report.id}`)}
										>
										info
										</button>
										<button className=" ms-3 btn btn-bright cyan  bg-color text-white"
											onClick={() => {
												setSelectingDoctor(true)
												setSelectingReportId(report.id)
											}}
										>
											consulting
										</button>
										<button className=" ms-3 btn btn-danger"
											onClick={() => deleteconsulting(report.id)}
										>
											Delete
										</button>
									</td>
								</tr>
						
							)
						})
					}
				</tbody>
			</table>

			{
				(selectingDoctor && selectingReportId) && createPortal(
					<SelectingDoctor
						reportId={selectingReportId}
						setSelectingDoctor={setSelectingDoctor}
						setSelectingReportId={setSelectingReportId} />,
					document.getElementById('root')
				)
			}
		</>
	);
};

export default MyReports;