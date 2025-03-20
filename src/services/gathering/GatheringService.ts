import Service from "@/services/Service";
import { IGathering } from "@/types/gathering";

class GatheringService extends Service {
  constructor() {
    super();
    this.setToken("");
  }

  getGatheringList(filters?: string) {
    if (filters) {
      console.log("[getGatheringList] filter", filters);
      return this.http.get<IGathering[]>(`/gatherings${filters}`);
    } else {
      console.log("[getGatheringList] no filter", filters);
    }
    return this.http.get<IGathering[]>("/gatherings");
  }
  getGatheringDetail(id: string) {
    const data = this.http.get<IGathering>(`/gatherings/${id}`);
    return data;
  }
  deleteGathering(id: string) {
    const data = this.http.put(`/gatherings/${id}/cancel`);
    return data;
  }
  joinGathering(id: string) {
    const data = this.http.post(`/gatherings/${id}/join`);
    return data;
  }
  leaveGathering(id: string) {
    const data = this.http.delete(`/gatherings/${id}/leave`);
    return data;
  }
}

const gatheringService = new GatheringService();

export default gatheringService;
