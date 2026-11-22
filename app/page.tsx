'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [policy, setPolicy] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    setLoading(true)
    if (!policy) { alert('Enter policy number'); setLoading(false); return }
    const { data, error } = await supabase.from('policies').select('*').eq('policy_number', policy.trim()).single()
    if (error || !data) { alert('Policy not found: ' + policy + ' - Try POL-MUN-4401'); setLoading(false); return }
    // Simple demo password check - 1234
    if (password !== '1234' && password !== '') { alert('Wrong password - Use 1234 for demo'); setLoading(false); return }
    localStorage.setItem('policy', data.policy_number)
    localStorage.setItem('entity', data.entity_name)
    router.push('/client/home')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="logo" className="h-10 w-auto" />
          <div>
            <div className="font-bold">Mpumelelo Services</div>
            <div className="text-xs text-gray-500">Since 2006 • 100% Black Owned</div>
          </div>
        </div>
        
        <h1 className="font-bold text-lg">Client Login</h1>
        <p className="text-xs text-gray-500 mb-4">Enter Policy Number + Password 1234</p>
        
        <div className="space-y-3">
          <input value={policy} onChange={e=>setPolicy(e.target.value)} placeholder="Policy Number e.g. POL-MUN-4401" className="w-full p-3 border rounded-xl text-sm" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password (1234)" className="w-full p-3 border rounded-xl text-sm" />
          <button onClick={login} disabled={loading} className="w-full h-12 bg-[#0E7A7B] text-white rounded-xl font-bold">
            {loading ? '...' : 'Login'}
          </button>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={()=>{setPolicy('POL-MUN-4401'); setPassword('1234')}} className="p-2 bg-teal-50 border border-teal-200 rounded-xl text-xs text-left">
              <div className="font-bold">Tshwane Municipality</div><div>POL-MUN-4401 / 1234</div>
            </button>
            <button onClick={()=>{setPolicy('POL-88452190'); setPassword('1234')}} className="p-2 bg-gray-50 border rounded-xl text-xs text-left">
              <div className="font-bold">Private Client</div><div>POL-88452190 / 1234</div>
            </button>
          </div>

          <div className="pt-4 border-t mt-4">
            <a href="/broker" className="block w-full h-10 bg-gray-900 text-white rounded-xl text-sm flex items-center justify-center">Broker Admin Login →</a>
            <div className="text-[10px] text-gray-400 mt-2 text-center">50 Constantia Blvd, Roodepoort • 082 539 6224</div>
          </div>
        </div>
      </div>
    </div>
  )
}
