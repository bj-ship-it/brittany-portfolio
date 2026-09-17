const attendee = { first_name: "Alex", last_name: "Demo", email: "alex@example.com", ticket_type: "VIP — DEMO ONLY", ticket_id: "DEMO-TICKET-001", order_id: "DEMO-ORDER-001", access_level: "Sample VIP", checked_in: false };
export const supabase = {
 auth: { getUser: async () => ({data: {user: {email: attendee.email}}}), signOut: async () => ({error:null}) },
 from: (_table:string) => ({select: (_fields:string) => ({ilike: async (_column:string,_value:string) => ({data:[attendee],error:null})})})
};
