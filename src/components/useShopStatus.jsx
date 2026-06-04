export const useShopStatus = () => {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday
  const hour = now.getHours();
  
  // Logic: Closed on Sunday, split shifts on other days
  const isSunday = day === 0;
  const isMorning = hour >= 9 && hour < 13;
  const isAfternoon = hour >= 14 && hour < 19;
  
  const isOpen = !isSunday && (isMorning || isAfternoon);
  
  return {
    status: isOpen ? "Open" : "Closed",
    color: isOpen ? "hsl(145, 86%, 44%)" : "hsl(15, 91%, 47%)"
  };
};