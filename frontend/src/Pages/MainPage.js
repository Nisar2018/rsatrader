
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();

    const handleReport = () => {
    
        navigate('/Reportd');

    };
   
    const handleStoreLedger= async()=>{
    
        navigate('/StoreLedger')
    
    };
     const handleCustomerBalance = async () => {
        navigate('/CustomerBalance')
      }; 

      const handleItemSummary= async()=>{
        navigate('/ItemSummary')
      };

      const handlePurchaseActivity= async()=>{
        navigate('/PurchaseActivity')
      };

    
   const handleCashBook= async()=>{
    navigate('/CashBook')
   };
    const handleSalesActivity= async()=>{
        navigate('/SaleActivity')
    };
    
    const handleSalesSummary= async()=>{
        navigate('/SaleSummary')
    };
    const handleDashboard= async()=>{
        navigate('/dashboard')
    };
    const handleAccountBalance= async()=>{
        navigate('/accountBalance')
    };
    
    
    
    const handleLogout = () => {
     
        navigate('/logout');
    };
    



    return (
        <>

            <div className="container text-center">
                <div className="row justify-content-md-center mt-5">
                    <div className="box col col-md-6 m-auto ">
                        <h1 className="mb-3 text-center"> Trader Reporting Page</h1>
                        <div className="row mb-4">
                            <div className="col col-md-4 mt-4">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleReport} >General Ledger</button>
                            </div>
                            <div className="col col-md-4 mt-4">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleAccountBalance} >Account Balance</button>
                            </div>
                            <div className="col col-md-4 mt-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleStoreLedger} >Store Ledger</button>
                            </div>
                        </div>
                        <div className="row mb-4">
                           <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleCustomerBalance} >Customer Balance</button>
                            </div>
                            <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleItemSummary} >Item Summary</button>
                            </div>
                            <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleSalesActivity} >Sales Activity</button>
                            </div>
                        </div>
                        <div className="row mb-4">
                           <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handlePurchaseActivity} >Purchase Activity</button>
                            </div>
                            <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleCashBook} >Cash Book</button>
                            </div>
                            <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleSalesSummary} >Sales Summary </button>
                            </div>
                        </div>
                        <div className="row mb-4">
                        <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleDashboard} >Dashboard </button>
                            </div>
                            <div className="col col-md-4 ">
                                <button type="button" className="btn btn-primary btn-md " onClick={handleLogout} >Logout</button>
                            </div>
                            
                        </div>



                    </div>

                </div>
            </div>
      
      </>

    );

}
