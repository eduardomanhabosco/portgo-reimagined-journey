import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Search, School, Building } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface UserFromAPI { id: number; name: string; score: number; school: string; }
interface SchoolRank { rank: number; school: string; total_score: number; }

const RankingPage = () => {
  const { auth } = useAuth();
  
  const [generalUsers, setGeneralUsers] = useState<UserFromAPI[]>([]);
  const [schoolUsers, setSchoolUsers] = useState<UserFromAPI[]>([]);
  const [schoolsRanking, setSchoolsRanking] = useState<SchoolRank[]>([]);
  const [allSchools, setAllSchools] = useState<string[]>([]);
  
  const [loadingGeneral, setLoadingGeneral] = useState(true);
  const [loadingSchool, setLoadingSchool] = useState(false);
  const [loadingSchoolsRanking, setLoadingSchoolsRanking] = useState(true);
  const [loadingAllSchools, setLoadingAllSchools] = useState(true);

  const [selectedSchool, setSelectedSchool] = useState<string | null>(auth.user?.school || null);

  useEffect(() => {
    apiClient.get<UserFromAPI[]>('/ranking/').then(res => setGeneralUsers(res.data)).finally(() => setLoadingGeneral(false));
    apiClient.get<SchoolRank[]>('/ranking/schools').then(res => setSchoolsRanking(res.data)).finally(() => setLoadingSchoolsRanking(false));
    apiClient.get<string[]>('/schools/').then(res => setAllSchools(res.data)).finally(() => setLoadingAllSchools(false));
    
    if (auth.user?.school) {
      handleSchoolClick(auth.user.school);
    }
  }, [auth.user]);

  const handleSchoolClick = async (schoolName: string) => {
    setLoadingSchool(true);
    setSelectedSchool(schoolName);
    setSchoolUsers([]);
    try {
      const response = await apiClient.get<UserFromAPI[]>(`/ranking/school/${schoolName}`);
      setSchoolUsers(response.data);
    } catch (error) { console.error(error); }
    finally { setLoadingSchool(false); }
  };

  const UserList = ({ users }: { users: UserFromAPI[]}) => (
    <ul className="divide-y dark:divide-gray-700 max-h-[60vh] overflow-y-auto">
      {users.length === 0 ? <li className="p-4 text-center text-gray-500">Nenhum jogador encontrado.</li>
       : users.map((user, index) => (
        <li key={user.id} className={`flex items-center p-4 ${auth.user?.id === user.id ? 'bg-blue-100 dark:bg-blue-900/40' : ''}`}>
          <div className="w-12 text-center font-bold text-gray-500">{index + 1}</div>
          <div className="flex-grow font-semibold">{user.name} <span className="text-sm text-gray-400 font-normal hidden sm:inline">- {user.school}</span></div>
          <Badge variant="secondary" className="font-bold">{user.score} pts</Badge>
        </li>
      ))}
    </ul>
  );

  return (
    <main className="min-h-screen w-full bg-slate-100 dark:bg-gray-900 p-4 sm:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8"><Button asChild variant="ghost"><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Voltar ao Início</Link></Button></div>
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="por-escola">Por Escola</TabsTrigger>
            <TabsTrigger value="disputa-escolas">Disputa de Escolas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral">
            <Card className="mt-4"><CardHeader className="text-center"><Trophy className="h-8 w-8 mx-auto text-blue-500"/><CardTitle className="mt-2">Ranking Geral</CardTitle></CardHeader><CardContent className="p-0">{loadingGeneral ? <Skeleton className="h-40"/> : <UserList users={generalUsers} />}</CardContent></Card>
          </TabsContent>

          <TabsContent value="por-escola">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Card><CardHeader><CardTitle>Selecione uma Escola</CardTitle></CardHeader><CardContent className="flex flex-col space-y-2 max-h-[60vh] overflow-y-auto">{loadingAllSchools ? <Skeleton className="h-40"/> : allSchools.map(school => (<Button key={school} variant={selectedSchool === school ? 'default' : 'secondary'} onClick={() => handleSchoolClick(school)} className="justify-start"><Building className="mr-2 h-4 w-4"/> {school}</Button>))}</CardContent></Card>
              <Card><CardHeader><CardTitle>Ranking da Escola</CardTitle><CardDescription>{selectedSchool || "Nenhuma"}</CardDescription></CardHeader><CardContent className="p-0">{loadingSchool ? <Skeleton className="h-40"/> : <UserList users={schoolUsers} />}</CardContent></Card>
            </div>
          </TabsContent>

          <TabsContent value="disputa-escolas">
            <Card className="mt-4"><CardHeader className="text-center"><School className="h-8 w-8 mx-auto text-purple-500"/><CardTitle className="mt-2">Disputa de Escolas</CardTitle></CardHeader><CardContent className="p-0"><ul className="divide-y dark:divide-gray-700 max-h-[60vh] overflow-y-auto">{loadingSchoolsRanking ? <Skeleton className="h-40"/> : schoolsRanking.map((school) => (<li key={school.rank} className={`flex items-center p-4 ${auth.user?.school === school.school ? 'bg-blue-100 dark:bg-blue-900/40' : ''}`}><div className="w-12 text-center font-bold text-gray-500">{school.rank}</div><div className="flex-grow font-semibold">{school.school} {auth.user?.school === school.school && "(Sua escola)"}</div><Badge variant="destructive" className="font-bold">{school.total_score} pts</Badge></li>))}</ul></CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
export default RankingPage;