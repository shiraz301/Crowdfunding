import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';
import { money } from '../assets';

// Withdraw page component for implementation of withdrawals

const Withdraw = () => {
  const { getUserCampaigns, withdrawFunds } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userCampaigns, setUserCampaigns] = useState([]);

  useEffect(() => {
    const fetchUserCampaigns = async () => {
      try {
        const campaigns = await getUserCampaigns();
        setUserCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching user campaigns:", error);
      }
    };
    fetchUserCampaigns();
  }, [getUserCampaigns]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleWithdraw = async (pId) => {
    setIsLoading(true);
    try {
      await withdrawFunds(pId);
      // Refresh user campaigns after successful withdrawal
      const updatedCampaigns = await getUserCampaigns();
      setUserCampaigns(updatedCampaigns);
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Withdrawal failed:", error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] mt-[15px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Withdraw Funds
        </h1>
      </div>
      <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {userCampaigns.map((campaign) => (
          <div
            key={campaign.pId}
            className="flex items-center p-4 bg-[#3a3a43] rounded-[10px]"
          >
            <img src={money} alt="money" className="w-[38px] h-[38px] object-contain" />
            <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-white ml-[20px] text-[20px] mb-[20px]">{campaign.title}</h3>
              <div className='flex flex-col ml-[20px]'>
              <p className="text-gray-400">Target: {campaign.target} ETH</p>
              <p className="text-gray-400">Amount Collected: {campaign.amountCollected} ETH</p>
              <p className="text-gray-400">Deadline: {formatDate(campaign.deadline)}</p>
              </div>
              <CustomButton
                title={campaign.withdrawn ? "Withdrawn" : "Withdraw"}
                handleClick={() => handleWithdraw(campaign.pId)}
                styles={campaign.withdrawn ? "bg-gray-600" : "bg-green-600"}
                disabled={campaign.withdrawn || isLoading}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Withdraw;
