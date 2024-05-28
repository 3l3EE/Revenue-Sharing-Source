import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ethers } from "ethers";
import { contracts } from "@/utils/dev/contractInit";
import { handleContractError } from "@/utils/dev/handleContractError";
import { EventEscrowComponentProps } from "@/utils/dev/typeInit";
import useExhibit from "@/lib/useGetExhibitById";
import { BanknotesIcon } from "@heroicons/react/20/solid";

const EventEscrowComponent = ({ provider, userAddress }: any) => {
    // Hardcoded exhibit ID for demo
    const exhibitId = '0xe405b9c97656336ab949401bcd41ca3f50114725';

    // State for managing component data and UI
    const [status, setStatus] = useState<string>('');
    const [escrowDetails, setEscrowDetails] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [distributionSuccessful, setDistributionSuccessful] = useState<boolean>(false);
    const [distributionFailed, setDistributionFailed] = useState<boolean>(false);

    // Fetch exhibit details
    const exhibit = useExhibit(exhibitId);

    // Function to fetch escrow details from EventOrganizerService contract
    const fetchEscrowDetails = async () => {
        if (!exhibit) {
            setStatus('No matching exhibit found.');
            return;
        }
        try {
            const signer = provider.getSigner();
            const eventOrganizerServiceContract = contracts.getEventOrganizerService().connect(signer);

            const escrowAddress = await eventOrganizerServiceContract.getEventEscrow(exhibitId);
            const escrowContract = contracts.getEventEscrow(escrowAddress).connect(signer);

            const shares = await escrowContract.getShares();
            const beneficiaries = await escrowContract.getBeneficiaries();

            setEscrowDetails({
                id : escrowAddress,
                shares,
                beneficiaries
            });
            setStatus('');
        } catch (error) {
            setStatus('Failed to fetch escrow details.');
            console.error(error);
        }
    };

    // Effect hook to fetch escrow details when the component mounts or exhibitId changes
    useEffect(() => {
        fetchEscrowDetails();
    }, [exhibitId, exhibit]);

    // Function to distribute funds from the escrow contract
    const distributeFunds = async () => {
        setIsLoading(true);

        // Check if escrow details are available
        if (!escrowDetails || !escrowDetails.id) {
            setStatus('No EventEscrow address found for the exhibit.');
            setIsLoading(false);
            return;
        }

        // Attempting to distribute funds
        try {
            const signer = provider.getSigner();
            const escrowContract = contracts.getEventEscrow(escrowDetails.id).connect(signer);

            setStatus('Initiating fund distribution...');
            const tx = await escrowContract.distributePayments();
            await tx.wait(2);
            setStatus('Funds distributed successfully.');
            setDistributionSuccessful(true);

            // Refresh escrow details post-distribution
            fetchEscrowDetails();

        } catch (error: any) {
            console.error('Error in distributing funds:', error);
            const friendlyMessage = handleContractError(error);
            setStatus(friendlyMessage);
            setDistributionFailed(true);
        }
        setIsLoading(false);
    };

    // Render component UI
    return (
        <div className='flex flex-col gap-2'>
            {distributionSuccessful ? (
                <div>
                    <p>Funds distributed successfully!</p>
                    {/* Actions post-distribution */}
                </div>
            ) : (
                <button className="w-[15%] p-4 text-3xl bg-orange-500 rounded-tl-2xl text-white fixed bottom-0 right-0 shadow-md"   onClick={distributeFunds}
                disabled={isLoading} ><BanknotesIcon/></button>
           
            )}
            {/* Display current status */}
            {status && <p className='text-sm font-semibold'>{status}</p>}
            {/* Display Escrow Details */}
            {escrowDetails && (
                <div>
                    <p>Escrow Address: {escrowDetails.id}</p>
                    <p>Shares: {JSON.stringify(escrowDetails.shares)}</p>
                    {/* Display Beneficiaries and Payments */}
                    {escrowDetails.beneficiaries.map((beneficiary: any, index: number) => (
                        <div key={index}>
                            <p>Beneficiary Address: {beneficiary.id}</p>
                            {beneficiary.paymentsReceived.map((payment: any, idx: number) => (
                                <div key={idx}>
                                    <p>Amount: {ethers.utils.formatEther(payment.amount)}</p>
                                    <p>Transaction Hash: {payment.transactionHash}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventEscrowComponent;
