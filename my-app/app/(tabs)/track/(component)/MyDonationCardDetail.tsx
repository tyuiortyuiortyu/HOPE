import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width - 32

function formatRupiah(num: number) {
    return 'Rp ' + Number(num).toLocaleString('id-ID')
}

const MyDonationCardDetail = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    // Destructure with fallback
    const {
        image,
        title,
        date,
        status,
        collected,
        target,
        nominaldonate,
        anotherdonate,
        iddonate,
        statusdonate,
        tanggaldonate,
    }: any = params

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header */}

            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                {/* Success Message */}
                <View style={styles.successSection}>
                    <View style={styles.successIcon}>
                        <Image 
                            source={require('../../../../assets/images/donate/done.png')} 
                            style={styles.successIconImage}
                        />
                    </View>
                    <Text style={styles.successTitle}>Terima Kasih!</Text>
                    <Text style={styles.successSubtitle}>Donasimu telah diterima dan akan segera disalurkan</Text>
                </View>
                {/* Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Tanggal</Text>
                        <Text style={styles.infoValue}>{tanggaldonate ? tanggaldonate.replace('-', ' - ') : '-'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Metode Pembayaran</Text>
                        <Text style={styles.infoValue}>Virtual Account</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>ID Donasi</Text>
                        <Text style={styles.infoValue}>#{iddonate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Status</Text>
                        <Text style={styles.infoValue}>{statusdonate ? statusdonate.charAt(0).toUpperCase() + statusdonate.slice(1) : '-'}</Text>
                    </View>
                </View>
                {/* Donation Card Preview */}
                <View style={{ marginTop: 18, alignItems: 'center' }}>
                    <View style={styles.cardPreview}>
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeaderRow}>
                                <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
                                <View style={styles.statusPill}>
                                    <Text style={styles.statusText}>Selesai</Text>
                                </View>
                            </View>
                            <Text style={styles.cardDateText}>X hours ago  ·  {formatRupiah(10000)}</Text>
                            <View style={{ height: 8 }} />
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${Math.min(collected / target, 1) * 100}%` }]} />
                            </View>
                            <View style={styles.amountRow}>
                                <Text style={styles.amountText}>
                                    {formatRupiah(collected)} / {formatRupiah(target)}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.donateAgainBtn}>
                                <Text style={styles.donateAgainText}>Donasi Lagi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Summary */}
                <View style={styles.summaryBox}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total donasi</Text>
                        <Text style={styles.summaryValue}>{formatRupiah(Number(nominaldonate) + Number(anotherdonate))}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Nominal donasi</Text>
                        <Text style={styles.summaryValue}>{formatRupiah(Number(nominaldonate))}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Donasi lainnya</Text>
                        <Text style={styles.summaryValue}>{formatRupiah(Number(anotherdonate))}</Text>
                    </View>
                </View>
            </ScrollView>
            {/* PUT HERE FOR THE LIHAT PROGRAM DONASI LAINNYA */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 8,
        paddingHorizontal: 12,
        backgroundColor: '#eaf7f6',
        borderBottomWidth: 1,
        borderBottomColor: '#cbe9e7',
    },
    backBtn: {
        padding: 8,
        marginRight: 8,
    },
    backBtnText: {
        fontSize: 22,
        color: '#82c3be',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
    },
    subtitle: {
        fontSize: 16,
        color: '#222',
        marginVertical: 8,
        textAlign: 'center',
    },
    infoCard: {
        borderWidth: 2,
        borderColor: '#bdbdbd',
        borderRadius: 16,
        margin: 18,
        padding: 18,
        backgroundColor: '#fff',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 16,
        color: '#222',
        fontWeight: '400',
    },
    infoValue: {
        fontSize: 16,
        color: '#222',
        fontWeight: 'bold',
    },
    cardPreview: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 4,
        width: CARD_WIDTH,
        alignSelf: 'center',
        padding: 0,
    },
    image: {
        width: 120,
        height: '100%',
        minHeight: 120,
    },
    cardContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    cardHeaderRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '500',
        flex: 1,
        marginRight: 8,
    },
    statusPill: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 999,
        alignSelf: 'flex-start',
        marginLeft: 8,
        backgroundColor: '#82c3be',
    },
    statusText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
    cardDateText: {
        color: '#888',
        fontSize: 14,
        marginTop: 8,
    },
    progressBarBg: {
        width: '100%',
        height: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginTop: 8,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 16,
        backgroundColor: '#82c3be',
        borderRadius: 8,
    },
    amountRow: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 15,
        color: '#222',
    },
    donateAgainBtn: {
        marginTop: 10,
        backgroundColor: '#cbe9e7',
        borderRadius: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 18,
        paddingVertical: 6,
    },
    donateAgainText: {
        color: '#222',
        fontWeight: '500',
        fontSize: 16,
    },
    summaryBox: {
        marginTop: 32,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#222',
        marginHorizontal: 0,
        paddingVertical: 18,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#222',
        fontWeight: '400',
    },
    summaryValue: {
        fontSize: 16,
        color: '#222',
        fontWeight: 'bold',
    },
})

export default MyDonationCardDetail
