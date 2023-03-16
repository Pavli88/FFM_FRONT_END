import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import { BsArrowClockwise, BsTrash } from "react-icons/bs";

import './TradeSignals.css'

const TradeSignals = () => {
    const refresh = <div>
        <div style={{display:'flex'}}>
            <div>
                <p>Signals</p>
            </div>
            <div style={{position: 'absolute', right: 45, margin: 0, padding: 0}}>
                <button style={{border: "none"}}><BsArrowClockwise/></button>
            </div>
            <div style={{position: 'absolute', right: 10, margin: 0, padding: 0}}>
                <button style={{border: "none"}}><BsTrash/></button>
            </div>
        </div>
    </div>
    return(
        <CardWithHeader headerContent={refresh}>
            <div style={{overflow:"scroll"}}>
                <table style={{width: '100%', height: '100%'}}>
                <tbody style={{width: '100%'}}>

                <tr>
                    <td className={'signal-row'}>
                        <div style={{width: '100%'}}>
                            <div className={'robot'}>
                                Silver ICA
                            </div>
                            <div>
                                BUY
                            </div>
                        </div>
                        <div className={'time'}>
                            2023-03-22 16:00
                        </div>
                    </td>
                </tr>

                <tr>
                    <td className={'signal-row'}>
                        <div style={{width: '100%'}}>
                            <div className={'robot'}>
                                Silver ICA
                            </div>
                            <div>
                                Close All
                            </div>
                        </div>
                        <div className={'time'}>
                            2023-03-22 16:00
                        </div>
                    </td>
                </tr>

                <tr>
                    <td className={'signal-row'}>
                        <div style={{width: '100%'}}>
                            <div className={'robot'}>
                                Silver ICA
                            </div>
                            <div>
                                Close
                            </div>
                        </div>
                        <div className={'time'}>
                            2023-03-22 16:00
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>
            </div>
        </CardWithHeader>
    )
};
export default TradeSignals;