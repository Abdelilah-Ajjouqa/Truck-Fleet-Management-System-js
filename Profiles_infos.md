# Truck Fleet Management — Demo Accounts & Profiles Reference

> **Web Application:** [http://localhost:5173](http://localhost:5173) (React / Vite Frontend)  
> **Backend API:** [http://localhost:3002/api](http://localhost:3002/api) (Express Backend)  
> **Database:** MongoDB on `localhost:27021` (`truckfleet`)

---

## 1. Authentication Credentials Summary

| Role | Name | Email | Password | Responsibilities |
|---|---|---|---|---|
| **Fleet Administrator** | Tariq Mansouri | `admin@truckfleet.com` | `Admin123456!` | Full fleet management: trucks, trailers, drivers, mission assignments, maintenance records |
| **Driver 1** | Omar Bennani | `driver.omar@truckfleet.com` | `Driver123456!` | View assigned trips, start missions, log completion with odometer/fuel |
| **Driver 2** | Karim El Amrani | `driver.karim@truckfleet.com` | `Driver123456!` | View assigned trips, in-transit missions, update mission status |
| **Driver 3** | Hassan Chaoui | `driver.hassan@truckfleet.com` | `Driver123456!` | Planned trips and vehicle handover |
| **Driver 4** | Youssef Tazi | `driver.youssef@truckfleet.com` | `Driver123456!` | Completed trip history and maintenance remarks |

---

## 2. Fleet Vehicles Overview (Trucks)

| Matricule | Model | Status | Odometer (KM) | Fuel Level | Tire Condition | Assigned Driver |
|---|---|---|---|---|---|---|
| `12450-A-26` | Volvo FH16 750 Globetrotter | `IN_TRANSIT` | 184,500 km | 68% | `GOOD` | Omar Bennani |
| `34890-B-1` | Scania R500 V8 Highline | `IN_TRANSIT` | 142,100 km | 55% | `GOOD` | Karim El Amrani |
| `56120-D-6` | Mercedes-Benz Actros 1845 GigaSpace | `RESERVED` | 98,400 km | 92% | `GOOD` | Hassan Chaoui |
| `78230-A-33` | MAN TGX 18.510 EfficientLine | `AVAILABLE` | 64,500 km | 85% | `GOOD` | Youssef Tazi |
| `91045-H-40` | Renault Trucks T High 520 Sleeper | `AVAILABLE` | 215,000 km | 40% | `WORN` | Unassigned |
| `45670-B-7` | DAF XF 530 Super Space Cab | `MAINTENANCE` | 289,300 km | 25% | `CRITICAL` | Unassigned |

---

## 3. Fleet Trailers Overview

| Matricule | Type | Status | Tire Condition | Description |
|---|---|---|---|---|
| `TR-1029-A` | `FRIGO` (Refrigerated) | `IN_TRANSIT` | `GOOD` | Heavy cold-chain perishable cargo |
| `TR-2045-B` | `BACHE` (Curtainsider) | `IN_TRANSIT` | `GOOD` | General dry freight & consumer goods |
| `TR-3088-C` | `PLATEAU` (Flatbed) | `RESERVED` | `GOOD` | Oversized industrial & automotive equipment |
| `TR-4012-D` | `CITERNE` (Tanker) | `AVAILABLE` | `GOOD` | Liquid fuel and food-grade liquids (ADR compliant) |
| `TR-5099-E` | `FRIGO` (Refrigerated) | `MAINTENANCE` | `WORN` | Undergoing scheduled refrigeration unit calibration |
| `TR-6021-F` | `BACHE` (Curtainsider) | `AVAILABLE` | `GOOD` | Ready for next dispatch |

---

## 4. Seeded Missions / Trips Overview

| Mission Route | Status | Driver | Truck | Trailer | Start Date | Notes / Remarks |
|---|---|---|---|---|---|---|
| **Casablanca Port → Tangier Med Free Zone** | `IN_PROGRESS` | Omar Bennani | Volvo FH16 | `TR-1029-A` (FRIGO) | Oct 18, 2026 | Seafood transport (-18°C), highway A1 on schedule |
| **Casablanca Ain Sebaa → Marrakech Industrial** | `IN_PROGRESS` | Karim El Amrani | Scania R500 | `TR-2045-B` (BACHE) | Oct 18, 2026 | Consumer goods distribution, clear traffic past Berrechid |
| **Tangier Automotive City → Kenitra Atlantic Zone** | `PLANNED` | Hassan Chaoui | Actros 1845 | `TR-3088-C` (PLATEAU) | Oct 19, 2026 | Automotive components delivery |
| **Agadir Souss Port → Casablanca Logistics Park** | `COMPLETED` | Youssef Tazi | MAN TGX | `TR-6021-F` (BACHE) | Oct 15, 2026 | Agricultural produce delivered on time (145 L consumed) |
| **Fes Saïss Industrial → Casablanca Ain Sebaa** | `COMPLETED` | Omar Bennani | Volvo FH16 | `TR-1029-A` (FRIGO) | Oct 12, 2026 | Cold chain logs verified and customer signed |
| **Mohammedia Refinery → Meknes Agropolis** | `COMPLETED` | Karim El Amrani | Scania R500 | `TR-4012-D` (CITERNE) | Oct 10, 2026 | Liquid supply completed safely under ADR protocol |
| **Oujda Angad → Fes Bensouda** | `COMPLETED` | Hassan Chaoui | Renault T High | `TR-5099-E` (FRIGO) | Oct 06, 2026 | Minor rear axle tire wear noted for maintenance |
| **Casablanca → Beni Mellal** | `CANCELLED` | Youssef Tazi | DAF XF 530 | `TR-5099-E` (FRIGO) | Oct 03, 2026 | Pre-trip tire warning sensor triggered; sent to shop |

---

## 5. Re-running the Seed Script
To re-seed or reset the database at any time:
```bash
# Inside docker container:
docker exec truckfleet-backend npm run seed

# Or directly from backend folder if node is installed locally:
cd backend && npm run seed
```
