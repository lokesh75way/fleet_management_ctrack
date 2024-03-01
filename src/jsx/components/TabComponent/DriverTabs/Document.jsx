import React,{useState} from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

const Document = ({ setValue, register }) => {
  const {formState:errors, control, getValues} = useForm()
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-4">
          <label>Profile Pic</label>
          <div className="dz-default dlab-message upload-img mb-3">
            <form action="#" className="dropzone">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 20V35"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 mb-3"></div>
        <div className="col-xl-6 mb-4">
          <label>Driving License</label>
          <div className="dz-default dlab-message upload-img mb-3">
            <form action="#" className="dropzone">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 20V35"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
        <label className="form-label">
            Issue Date 
          </label>
          <Controller
            name="drivingLicenseIssueDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("drivingLicenseIssueDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("drivingLicenseIssueDate", newValue)}
              />
            )}
          />

          <label className="form-label">
            Expiry Date 
          </label>
          <Controller
            name="drivingLicenseExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("drivingLicenseExpiryDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("drivingLicenseExpiryDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-4">
          <label>Aadhar Card</label>
          <div className="dz-default dlab-message upload-img mb-3">
            <form action="#" className="dropzone">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 20V35"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
        <label className="form-label">
            Issue Date 
          </label>
          <Controller
            name="aadharCardIssueDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("aadharCardIssueDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("aadharCardIssueDate", newValue)}
              />
            )}
          />

          <label className="form-label">
            Expiry Date 
          </label>
          <Controller
            name="aadharCardExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("aadharCardExpiryDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("aadharCardExpiryDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-4">
          <label>PAN Card </label>
          <div className="dz-default dlab-message upload-img mb-3">
            <form action="#" className="dropzone">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 20V35"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
        <label className="form-label">
            Issue Date 
          </label>
          <Controller
            name="panCardIssueDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("panCardIssueDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("panCardIssueDate", newValue)}
              />
            )}
          />

          <label className="form-label">
            Expiry Date 
          </label>
          <Controller
            name="panCardExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("panCardExpiryDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("panCardExpiryDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-4">
          <label>Bank Account</label>
          <div className="dz-default dlab-message upload-img mb-3">
            <form action="#" className="dropzone">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 20V35"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
        <label className="form-label">
            Issue Date 
          </label>
          <Controller
            name="bankAccountIssueDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("bankAccountIssueDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("bankAccountIssueDate", newValue)}
              />
            )}
          />

          <label className="form-label">
            Expiry Date 
          </label>
          <Controller
            name="bankAccountExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("bankAccountExpiryDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("bankAccountExpiryDate", newValue)}
              />
            )}
          />
        </div>
        <div className="col-xl-6 mb-4">
          <label>Mediclaim</label>
          <div className="dz-default dlab-message upload-img mb-3">
            <form action="#" className="dropzone">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 20V35"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                  stroke="#DADADA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
        <label className="form-label">
            Issue Date 
          </label>
          <Controller
            name="mediclaimIssueDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("mediclaimIssueDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("mediclaimIssueDate", newValue)}
              />
            )}
          />

          <label className="form-label">
            Expiry Date 
          </label>
          <Controller
            name="mediclaimExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("mediclaimExpiryDate") || new Date()}
                className="form-control"
                onChange={(newValue) => setValue("mediclaimExpiryDate", newValue)}
              />
            )}
          />
        </div> 
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
      
            <Button type="submit"> Submit</Button>

        </div>
      </div>
    </div>
  );
};

export default Document;
