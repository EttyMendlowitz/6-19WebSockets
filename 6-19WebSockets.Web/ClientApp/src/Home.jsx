import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useAuth } from './authContext';

const Home = () => {

    const [text, setText] = useState('');
    const [jobs, setJobs] = useState([]);
    const connectionRef = useRef(null);
    const { user } = useAuth();

    const onAddClick = async () => {
        await axios.post('/api/jobs/addjob', { description: text })
        setText('');
    }

    const onDoingClick = async (job) => {
        await axios.post('/api/jobs/setbeingdone', job);
    }

    const onDoneClick = async(job) => {
        await axios.post('/api/jobs/setdone', job)
    }

    useEffect(() => {

        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/jobs").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('newJobRecieved', job => {
                setJobs(jobs => [...jobs, job]);
            });

            connection.on('jobUpdate', all => {
                setJobs(all);
            })

        }

        const getAll = async () => {
            const { data } = await axios.get('/api/jobs/getall');
            setJobs(data);
        }

        connectToHub();
        getAll();

    }, [])


    return (<div className="container" style={{ marginTop: 80 }}>
        <div style={{ marginTop: 70 }}>
            <div className="row">
                <div className="col-md-10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task Title"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={onAddClick}>Add Task</button>
                </div>
            </div>
            <table className="table table-hover table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (<tr key={job.id}>
                        <td>{job.description}</td>
                        <td>
                            {!job.userId ?
                                <button className="btn btn-dark" onClick={() => onDoingClick(job)}>I'm doing this one!</button>
                                :
                                job.userId == user.id ?
                                    <button className="btn btn-success" onClick={() => onDoneClick(job) }>I'm done!</button>
                                    :
                                    < button className="btn btn-warning" disabled>{job.user.firstName} {job.user.lastName} is doing this</button>
                            }

                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Home;