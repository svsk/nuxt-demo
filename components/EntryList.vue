<script setup lang="ts">
import { Wish } from '@prisma/client';
import { ref } from 'vue';

const { data: entries, refresh: refreshEntries } = useFetch('/api/entries/getall');

const newEntry = ref<Wish | null>(null);
const handleAddClicked = async () => {
    const nextOrderValue = Math.max(...(entries.value?.map((e) => e.Order) || [0])) + 1;

    newEntry.value = {
        Id: crypto.randomUUID(),
        Name: '',
        Description: '',
        Price: 0,
        Order: nextOrderValue,
    } as Wish;
};

const handleSaveNewEntry = async () => {
    await useFetch('/api/entries/add', { method: 'POST', body: newEntry.value });
    newEntry.value = null;
    refreshEntries();
};
</script>

<template>
    <div class="flex flex-col flex-nowrap">
        <div class="flex justify-end pb-4">
            <button @click="handleAddClicked" class="rounded px-3 py-1 bg-blue-500 text-white">Add New</button>
        </div>

        <div v-if="!entries?.length" class="flex flex-col justify-center items-center text-gray-500 py-12">
            Nothing here yet...
        </div>

        <EntryListItem class="py-2 border-b border-gray-500" v-for="entry in entries" :entry="entry" :key="entry.Id" />
        <EntryListItem
            @save="handleSaveNewEntry"
            class="py-2 border-b border-gray-500"
            v-if="newEntry !== null"
            :entry="newEntry"
            editable
        />
    </div>
</template>
