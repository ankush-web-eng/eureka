'use client'

import { useEffect, useState, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Disease {
    disease: string;
}


export default function DiseaseFilter() {
    const [diseases, setDiseases] = useState<Disease[] | null>([]);
    const [selectedDisease, setSelectedDisease] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState<boolean>(false);


    const fetchDiseases = async () => {
        try {
            const response = await axios.get('');
            setDiseases(response.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiseases();
    }, []);


    return (
        <div className="h-fit py-3 flex justify-center items-center bg-inherit">
            <form className='space-x-2' >
                <select
                    name="city"
                    id="city"
                    value={selectedDisease}
                    onChange={(e) => setSelectedDisease(e.target.value)}
                    required
                    className='border py-3 rounded-2xl px-2'
                >
                    <option value="" disabled>Choose your Disease</option>
                    {diseases && diseases.map((disease, index) => (
                        <option key={index} value={disease.disease}>
                            {disease.disease}
                        </option>
                    ))}
                </select>
                <button className="px-3 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl" type="submit">
                    {sending ? <LuLoader size={60} color="white" className="animate-spin" /> : 'Apply'}
                </button>
            </form>
        </div>
    );
}
