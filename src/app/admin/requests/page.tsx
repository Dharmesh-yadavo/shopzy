"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AiOutlineSearch,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineMore,
  AiOutlineEye,
} from "react-icons/ai";
import { cn } from "@/lib/utils";

// --- TYPES ---
type RequestStatus = "pending" | "approved" | "rejected";

interface ProductRequest {
  id: string;
  productName: string;
  vendorName: string;
  category: string;
  price: number;
  date: string;
  status: RequestStatus;
  image: string;
}

// --- MOCK DATA ---
const INITIAL_REQUESTS: ProductRequest[] = [
  {
    id: "PR-001",
    productName: "Wireless Headphones",
    vendorName: "Samsung Official",
    category: "Electronics",
    price: 12999,
    date: "2026-03-15",
    status: "pending",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PR-002",
    productName: "Leather Jacket",
    vendorName: "Moda Style",
    category: "Fashion",
    price: 5499,
    date: "2026-03-14",
    status: "approved",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PR-003",
    productName: "Smart Watch S3",
    vendorName: "Tech Hub",
    category: "Electronics",
    price: 8999,
    date: "2026-03-14",
    status: "rejected",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PR-004",
    productName: "Yoga Mat Pro",
    vendorName: "FitBit India",
    category: "Fitness",
    price: 1200,
    date: "2026-03-13",
    status: "pending",
    image: "https://via.placeholder.com/40",
  },
];

export default function ProductRequestPage() {
  const [search, setSearch] = useState("");

  const filteredRequests = INITIAL_REQUESTS.filter(
    (req) =>
      req.productName.toLowerCase().includes(search.toLowerCase()) ||
      req.vendorName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-6 bg-[#0f0e0a] min-h-screen text-stone-200">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Product Requests
          </h1>
          <p className="text-stone-400 text-sm">
            Review and manage product submissions from your vendors.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#1c1b14] border border-stone-800 rounded-lg px-3 py-1 w-full md:w-80">
          <AiOutlineSearch className="text-stone-500" />
          <Input
            placeholder="Search products or vendors..."
            className="bg-transparent border-none focus-visible:ring-0 text-sm h-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-[#1c1b14] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-stone-900/50">
            <TableRow className="border-stone-800 hover:bg-transparent">
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Product
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Vendor
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Category
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Price
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Date
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Status
              </TableHead>
              <TableHead className="text-right text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow
                key={request.id}
                className="border-stone-800 hover:bg-stone-900/40 transition-colors"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={request.image}
                      alt={request.productName}
                      className="w-10 h-10 rounded-lg object-cover bg-stone-800"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {request.productName}
                      </p>
                      <p className="text-[11px] text-stone-500">{request.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-stone-300">
                  {request.vendorName}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-stone-900 border-stone-700 text-stone-400 font-normal"
                  >
                    {request.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-bold text-yellow-500/90">
                  ₹{request.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-stone-500">
                  {request.date}
                </TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionMenu />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    approved: "bg-green-500/10 text-green-500 border-green-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Badge
      className={cn(
        "capitalize px-2 py-0.5 text-[11px] font-bold border",
        styles[status],
      )}
    >
      {status}
    </Badge>
  );
}

function ActionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-stone-800 text-stone-400"
        >
          <AiOutlineMore size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#1c1b14] border-stone-800 text-stone-300 shadow-2xl"
      >
        <DropdownMenuLabel className="text-stone-500 text-[10px] uppercase tracking-tighter">
          Review Options
        </DropdownMenuLabel>
        <DropdownMenuItem className="hover:bg-stone-800 cursor-pointer gap-2">
          <AiOutlineEye className="text-blue-400" /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-stone-800 cursor-pointer gap-2">
          <AiOutlineCheck className="text-green-500" /> Approve Product
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-stone-800 cursor-pointer gap-2 text-red-400 hover:text-red-300">
          <AiOutlineClose /> Reject Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
