import CustomModal from "../../../../components/Modals/Modals";
import Select from "react-select";
const NewPriceEntry = () => {
    return (
        <CustomModal>
            <div style={{width: '100%'}}>

                <div className={'block'}>
                    <label>Date</label>
                    <input ref={dateRef} defaultValue={currentDate} type={'date'}></input>
                </div>

                <div className={'block'}>
                    <label>Price</label>
                    <input ref={priceRef} type={'number'}></input>
                </div>

                <div className={'block'}>
                    <label>Source</label>
                    <div style={{width: 300, position: "absolute", right: 15}}>
                        <Select
                            options={priceSources}
                            defaultValue={priceSource}
                            onChange={(e) => setPriceSource(e.value)}
                            className={'instrument-search-input-field'}
                        />
                    </div>
                </div>

            </div>
        </CustomModal>
    );
};
export default NewPriceEntry;