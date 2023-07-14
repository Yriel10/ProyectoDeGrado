import React from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";

function Table() {
  return (
    <MDBContainer fluid>
      <section>
        <div className="shadow-4 rounded-5 overflow-hidden">
          <MDBTable>
            <MDBTableHead light>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ verticalAlign: "middle" }}>
              <tr>
                <th>John Doe</th>
                <td>Software engineer</td>
                <td>Active</td>
                <td>Senior</td>
                <td>
                  <MDBBtn
                    className="fw-bold"
                    color="link"
                    rounded
                    size="sm"
                    rippleColor="dark"
                  >
                    Edit
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <th>Alex Ray</th>
                <td>Consultant</td>
                <td>Onboarding</td>
                <td>Junior</td>
                <td>
                  <MDBBtn
                    className="fw-bold"
                    color="link"
                    rounded
                    size="sm"
                    rippleColor="dark"
                  >
                    Edit
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <th>Kate Hunington</th>
                <td>Designer</td>
                <td>Awaiting</td>
                <td>Senior</td>
                <td>
                  <MDBBtn
                    className="fw-bold"
                    color="link"
                    rounded
                    size="sm"
                    rippleColor="dark"
                  >
                    Edit
                  </MDBBtn>
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </section>
    </MDBContainer>
  );
}

export default Table;
