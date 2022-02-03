import React, { useState, useEffect } from "react";
import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3001/Registration",
});
export default function TenantList() {
  const [tenant, setTenant] = useState([]);
  useEffect(() => {
    client.get("/").then((res) => {
      console.log(res.data);
      setTenant(res.data);
    });
  }, []);
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Tenant List</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th className="w-100">Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tenant &&
                    tenant.map((val, i) => (
                      <tr key={i}>
                        <td>{val.userid}</td>
                        <td>{val.description}</td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                            >
                              <i className="mdi mdi-sync"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                            >
                              <i className="mdi mdi-delete"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-dark"
                            >
                              <i className="mdi mdi-settings"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
