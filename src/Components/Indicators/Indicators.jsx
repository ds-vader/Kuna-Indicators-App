import React from 'react';
import { Button, Table} from 'react-bootstrap'
import { ArrowUp, ArrowDown, XCircleFill } from 'react-bootstrap-icons';
import NewIndicator from './NewIndicator'

const Indicators = (props) => {

    return (
        <div>
            <h1>Indicators</h1>
            <NewIndicator addNewIndicator={props.addNewIndicator}/>
            <hr style={{ width: '60%' }} />
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Pair</th>
                        <th>Start</th>
                        <th>Now</th>
                        <th>Marker</th>
                        <th>type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.indicators.map(i => <tr key={i.id}>
                        <td>
                            {i.id + 1}
                        </td>
                        <td>
                            {i.date}
                        </td>
                        <td>
                            {i.pair}
                        </td>
                        <td>
                            {i.start}
                        </td>
                        <td>
                            {i.now}
                        </td>
                        <td>
                            {i.marker}
                        </td>
                        <td>
                            {i.type ? <ArrowUp /> : <ArrowDown />}
                        </td>
                        <td>
                            <Button variant="outline-danger" 
                            onClick={() => {
                                //modal confirm window for delete indicator 
                                if (window.confirm('Are you sure you wish to delete this indicator?'))
                                {props.deleteIndicator(i.id) }
                                }}>
                                <XCircleFill />
                            </Button>
                        </td>
                    </tr>

                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Indicators;
